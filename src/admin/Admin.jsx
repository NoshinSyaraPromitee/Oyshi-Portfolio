import { useEffect, useRef, useState } from 'react';
import { supabase, TABLE } from '../lib/supabase';
import { defaults } from '../content/defaults';
import { pages, allPages, pagesUsingKey } from './schema';
import Field, { getPath, setPath } from './fields';
import './admin.css';

const clone = (v) => JSON.parse(JSON.stringify(v));
const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
const withDefaults = (key, saved) => {
  if (saved == null) return clone(defaults[key]);
  return isObject(defaults[key]) && isObject(saved) ? { ...clone(defaults[key]), ...clone(saved) } : clone(saved);
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError(err.message === 'Invalid login credentials' ? 'Wrong email or password.' : err.message);
    setBusy(false);
  };

  return (
    <div className="ed-login">
      <form className="ed-box" onSubmit={submit}>
        <h1>Edit your website</h1>
        <p className="ed-muted">Sign in to make changes.</p>
        <label className="ed-field">
          <div className="ed-label"><span>Email</span></div>
          <input className="ed-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label className="ed-field">
          <div className="ed-label"><span>Password</span></div>
          <input className="ed-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>
        {error && <p className="ed-error">{error}</p>}
        <button className="ed-btn ed-btn--wide" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
        <a className="ed-textbtn" href="#home">Back to website</a>
      </form>
    </div>
  );
}

function PasswordDialog({ email, onClose }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (next.length < 8) return setError('The new password must be at least 8 characters.');
    if (next !== confirm) return setError('The new passwords do not match.');
    setBusy(true);
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password: current });
    if (authErr) {
      setBusy(false);
      return setError('Your current password is not correct.');
    }
    const { error: updErr } = await supabase.auth.updateUser({ password: next });
    setBusy(false);
    if (updErr) return setError(updErr.message);
    setDone(true);
  };

  return (
    <div className="ed-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <form className="ed-box" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <h1>Change password</h1>
        {done ? (
          <>
            <p className="ed-muted">Done. Use your new password next time you sign in.</p>
            <button type="button" className="ed-btn ed-btn--wide" onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            {[
              ['Current password', current, setCurrent, 'current-password'],
              ['New password', next, setNext, 'new-password'],
              ['Repeat new password', confirm, setConfirm, 'new-password'],
            ].map(([label, val, set, ac]) => (
              <label key={label} className="ed-field">
                <div className="ed-label"><span>{label}</span></div>
                <input className="ed-input" type="password" value={val} onChange={(e) => set(e.target.value)} required autoComplete={ac} />
              </label>
            ))}
            {error && <p className="ed-error">{error}</p>}
            <div className="ed-row-end">
              <button type="button" className="ed-btn ed-btn--ghost" onClick={onClose}>Cancel</button>
              <button className="ed-btn" disabled={busy}>{busy ? 'Saving...' : 'Change password'}</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function SaveStatus({ status, dirty }) {
  if (status === 'saving') return <span className="ed-status">Saving...</span>;
  if (status === 'error') return <span className="ed-status ed-status--error">Not saved. Please try again.</span>;
  if (dirty) return <span className="ed-status ed-status--warn">Unsaved changes</span>;
  if (status === 'saved') return <span className="ed-status ed-status--ok">&#10003; Saved</span>;
  return <span className="ed-status ed-status--muted">No changes yet</span>;
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function Editor({ session }) {
  const [content, setContent] = useState(null);
  const [savedContent, setSavedContent] = useState(null);
  const [edited, setEdited] = useState({});
  const [pageId, setPageId] = useState(allPages[0].id);
  const [status, setStatus] = useState('idle');
  const [loadError, setLoadError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [historySize, setHistorySize] = useState(0);
  const history = useRef([]);
  const lastChange = useRef({ key: null, time: 0 });

  const dirtyKeys = content && savedContent ? Object.keys(content).filter((k) => !same(content[k], savedContent[k])) : [];
  const dirty = dirtyKeys.length > 0;

  useEffect(() => {
    supabase
      .from(TABLE)
      .select('key, data')
      .then(({ data, error }) => {
        if (error) setLoadError(error.message);
        const saved = {};
        (data || []).forEach((r) => (saved[r.key] = r.data));
        const all = {};
        Object.keys(defaults).forEach((k) => (all[k] = withDefaults(k, saved[k])));
        setContent(all);
        setSavedContent(clone(all));
        setEdited(Object.fromEntries(Object.keys(saved).map((k) => [k, true])));
      });
  }, []);

  useEffect(() => {
    const warn = (e) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (key, value) => {
    const now = Date.now();
    const last = lastChange.current;
    if (last.key !== key || now - last.time > 1000) {
      history.current.push({ key, value: content[key] });
      if (history.current.length > 100) history.current.shift();
      setHistorySize(history.current.length);
    }
    lastChange.current = { key, time: now };
    setContent((c) => ({ ...c, [key]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const undo = () => {
    const step = history.current.pop();
    if (!step) return;
    setHistorySize(history.current.length);
    lastChange.current = { key: null, time: 0 };
    setContent((c) => ({ ...c, [step.key]: step.value }));
    setStatus('idle');
  };

  const save = async () => {
    if (!dirty || status === 'saving') return;
    setStatus('saving');
    const now = new Date().toISOString();
    const rows = dirtyKeys.map((key) => ({ key, data: content[key], updated_at: now }));
    const { error } = await supabase.from(TABLE).upsert(rows);
    if (error) return setStatus('error');
    setSavedContent((s) => ({ ...s, ...Object.fromEntries(rows.map((r) => [r.key, clone(r.data)])) }));
    setEdited((e) => ({ ...e, ...Object.fromEntries(rows.map((r) => [r.key, true])) }));
    setStatus('saved');
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const restore = async (page) => {
    const shared = pagesUsingKey(page.key);
    const msg =
      shared.length > 1
        ? `Restore the original version? This also restores: ${shared.join(', ')}.`
        : 'Restore the original version of this page? Your saved changes here will be removed.';
    if (!window.confirm(msg)) return;
    const { error } = await supabase.from(TABLE).delete().eq('key', page.key);
    if (error) return setStatus('error');
    const original = clone(defaults[page.key]);
    setContent((c) => ({ ...c, [page.key]: original }));
    setSavedContent((s) => ({ ...s, [page.key]: clone(original) }));
    history.current = history.current.filter((h) => h.key !== page.key);
    setHistorySize(history.current.length);
    setEdited((e) => ({ ...e, [page.key]: false }));
    setStatus('saved');
  };

  const go = (id) => {
    setPageId(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const page = allPages.find((p) => p.id === pageId);
  const data = content && content[page.key];

  return (
    <div className="ed">
      <header className="ed-top">
        <button className="ed-menu" onClick={() => setMenuOpen((o) => !o)} aria-label="Pages">&#9776;</button>
        <strong className="ed-top__title">Website editor</strong>
        <SaveStatus status={status} dirty={dirty} />
        <div className="ed-top__right">
          <button className="ed-btn ed-btn--ghost ed-btn--small" onClick={undo} disabled={!historySize}>Undo</button>
          <button className="ed-btn ed-btn--small" onClick={save} disabled={!dirty || status === 'saving'}>
            {status === 'saving' ? 'Saving...' : 'Save'}
          </button>
          <a className="ed-btn ed-btn--ghost ed-btn--small ed-hide-sm" href="/" target="_blank" rel="noreferrer">View website</a>
          <details className="ed-account">
            <summary className="ed-btn ed-btn--ghost ed-btn--small">Account</summary>
            <div className="ed-account__menu">
              <span className="ed-muted">{session.user.email}</span>
              <a className="ed-account__link" href="/" target="_blank" rel="noreferrer">View website</a>
              <button type="button" onClick={() => setShowPassword(true)}>Change password</button>
              <button type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
          </details>
        </div>
      </header>

      <div className="ed-layout">
        <nav className={`ed-side ${menuOpen ? 'is-open' : ''}`}>
          {pages.map((g) => (
            <div key={g.group} className="ed-side__group">
              <p className="ed-side__heading">{g.group}</p>
              {g.items.map((p) => (
                <button key={p.id} className={`ed-side__item ${p.id === pageId ? 'is-active' : ''}`} onClick={() => go(p.id)}>
                  {p.title}
                  {dirtyKeys.includes(p.key) && <span className="ed-dot" title="Unsaved changes" />}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <main className="ed-main">
          <div className="ed-page-head">
            <h1>{page.title}</h1>
            {page.help && <p className="ed-muted">{page.help}</p>}
          </div>

          {loadError && <p className="ed-error">Could not load your saved changes: {loadError}</p>}

          {!content ? (
            <p className="ed-muted">Loading...</p>
          ) : (
            <div className="ed-form">
              {page.fields.map((f) => (
                <Field key={f.path || 'root'} field={f} value={getPath(data, f.path)} onChange={(v) => update(page.key, setPath(data, f.path, v))} />
              ))}
            </div>
          )}

          {content && edited[page.key] && (
            <button type="button" className="ed-textbtn ed-restore" onClick={() => restore(page)}>
              Restore the original version of this page
            </button>
          )}
        </main>
      </div>

      {showPassword && <PasswordDialog email={session.user.email} onClose={() => setShowPassword(false)} />}
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    document.title = 'Website editor';
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="ed-login">
        <div className="ed-box">
          <h1>Editor not connected</h1>
          <p className="ed-muted">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the .env file, then restart the site.</p>
        </div>
      </div>
    );
  }
  if (checking) return null;
  return session ? <Editor session={session} /> : <Login />;
}
