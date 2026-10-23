import { useEffect, useRef, useState } from 'react';
import { supabase, BUCKET } from '../lib/supabase';

/* ---------- helpers ---------- */

export const getPath = (obj, path) => {
  if (!path) return obj;
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
};

export const setPath = (obj, path, value) => {
  if (!path) return value;
  const [head, ...rest] = path.split('.');
  const base = obj && typeof obj === 'object' ? obj : {};
  return { ...base, [head]: setPath(base[head], rest.join('.'), value) };
};

const move = (list, i, d) => {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const driveId = (text) => {
  const t = (text || '').trim();
  const m = t.match(/\/d\/([\w-]{10,})/) || t.match(/[?&]id=([\w-]{10,})/);
  return m ? m[1] : t;
};

const shrink = (file, keepPng) =>
  new Promise((resolve) => {
    const isPng = file.type === 'image/png';
    if ((keepPng && isPng) || file.size < 1.5 * 1024 * 1024 || !/^image\/(jpeg|png|webp)$/.test(file.type)) {
      resolve(file);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 2200 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', 0.86);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });

export const uploadPhoto = async (file, keepPng = false) => {
  const blob = await shrink(file, keepPng);
  const ext = blob.type === 'image/png' ? 'png' : blob === file ? file.name.split('.').pop() : 'jpg';
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(name, blob, { cacheControl: '31536000', contentType: blob.type || file.type });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
};

const confirmRemove = (what) => window.confirm(`Remove this ${what}?`);

/* ---------- small pieces ---------- */

function Label({ label, help }) {
  if (!label && !help) return null;
  return (
    <div className="ed-label">
      {label && <span>{label}</span>}
      {help && <small>{help}</small>}
    </div>
  );
}

function IconButton({ title, onClick, disabled, danger, children }) {
  return (
    <button type="button" className={`ed-icon ${danger ? 'ed-icon--danger' : ''}`} title={title} aria-label={title} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function FilePicker({ multiple, keepPng, onFiles, children, className }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    setError('');
    try {
      const urls = [];
      for (const f of files) urls.push(await uploadPhoto(f, keepPng));
      onFiles(urls);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    }
    setBusy(false);
  };

  return (
    <>
      <button type="button" className={className} onClick={() => ref.current.click()} disabled={busy}>
        {busy ? 'Uploading...' : children}
      </button>
      <input ref={ref} type="file" accept="image/*" multiple={multiple} hidden onChange={pick} />
      {error && <p className="ed-error">{error}</p>}
    </>
  );
}

/* ---------- field types ---------- */

function TextField({ field, value, onChange }) {
  const Tag = field.type === 'textarea' ? 'textarea' : 'input';
  return (
    <label className="ed-field">
      <Label label={field.label} help={field.help} />
      <Tag
        className="ed-input"
        rows={field.type === 'textarea' ? 4 : undefined}
        value={value || ''}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function SelectField({ field, value, onChange }) {
  return (
    <label className="ed-field">
      <Label label={field.label} help={field.help} />
      <select className="ed-input" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function DriveField({ field, value, onChange }) {
  const toLink = (id) => (id ? `https://drive.google.com/file/d/${id}/view` : '');
  const [text, setText] = useState(toLink(value));
  useEffect(() => {
    if (driveId(text) !== (value || '')) setText(toLink(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div className="ed-field">
      <Label label={field.label} help={field.help} />
      <div className="ed-drive">
        {value ? <img src={`https://drive.google.com/thumbnail?id=${value}&sz=w320`} alt="" /> : <span className="ed-drive__empty">No video</span>}
        <input
          className="ed-input"
          value={text}
          placeholder="https://drive.google.com/file/d/..."
          onChange={(e) => {
            setText(e.target.value);
            onChange(driveId(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

function ImageField({ field, value, onChange }) {
  const [pasting, setPasting] = useState(false);
  return (
    <div className="ed-field">
      <Label label={field.label} help={field.help} />
      <div className="ed-single">
        <div className="ed-single__preview">{value ? <img src={value} alt="" /> : <span>No photo</span>}</div>
        <div className="ed-single__actions">
          <FilePicker className="ed-btn" keepPng={field.keepPng} onFiles={([url]) => onChange(url)}>
            {value ? 'Change photo' : 'Upload photo'}
          </FilePicker>
          {pasting ? (
            <input className="ed-input" value={value || ''} placeholder="Paste an image link" onChange={(e) => onChange(e.target.value)} />
          ) : (
            <button type="button" className="ed-textbtn" onClick={() => setPasting(true)}>or paste a link</button>
          )}
        </div>
      </div>
    </div>
  );
}

function TextList({ field, value = [], onChange }) {
  const Tag = field.multiline ? 'textarea' : 'input';
  return (
    <div className="ed-field">
      <Label label={field.label} help={field.help} />
      <div className="ed-list">
        {value.map((item, i) => (
          <div key={i} className="ed-list__row">
            <Tag className="ed-input" rows={field.multiline ? 4 : undefined} value={item} onChange={(e) => onChange(value.map((v, k) => (k === i ? e.target.value : v)))} />
            <div className="ed-list__tools">
              <IconButton title="Move up" onClick={() => onChange(move(value, i, -1))} disabled={i === 0}>&uarr;</IconButton>
              <IconButton title="Move down" onClick={() => onChange(move(value, i, 1))} disabled={i === value.length - 1}>&darr;</IconButton>
              <IconButton title="Remove" danger onClick={() => confirmRemove('item') && onChange(value.filter((_, k) => k !== i))}>&times;</IconButton>
            </div>
          </div>
        ))}
        <button type="button" className="ed-add" onClick={() => onChange([...value, ''])}>+ {field.addLabel || 'Add'}</button>
      </div>
    </div>
  );
}

function Cards({ field, value = [], onChange }) {
  return (
    <div className="ed-field">
      <Label label={field.label} help={field.help} />
      <div className="ed-cards">
        {value.map((item, i) => (
          <div key={i} className="ed-card">
            <div className="ed-card__head">
              <span className="ed-card__no">{i + 1}</span>
              <div className="ed-card__tools">
                <IconButton title="Move up" onClick={() => onChange(move(value, i, -1))} disabled={i === 0}>&uarr;</IconButton>
                <IconButton title="Move down" onClick={() => onChange(move(value, i, 1))} disabled={i === value.length - 1}>&darr;</IconButton>
                <IconButton title="Remove" danger onClick={() => confirmRemove('item') && onChange(value.filter((_, k) => k !== i))}>&times;</IconButton>
              </div>
            </div>
            <div className="ed-card__body">
              {field.fields.map((f) => (
                <Field
                  key={f.path}
                  field={f}
                  value={getPath(item, f.path)}
                  onChange={(v) => onChange(value.map((x, k) => (k === i ? setPath(x, f.path, v) : x)))}
                />
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="ed-add" onClick={() => onChange([...value, { ...field.template }])}>+ {field.addLabel || 'Add'}</button>
      </div>
    </div>
  );
}

function PhotoGrid({ field, value = [], onChange }) {
  const imageKey = field.imageKey || 'src';
  const captions = field.captions || [];
  const makeItem = (url) => {
    const base = imageKey === 'src' ? { type: 'image' } : {};
    const blankCaptions = Object.fromEntries(captions.map((c) => [c.key, '']));
    return { ...base, ...blankCaptions, ...(field.template || {}), [imageKey]: url };
  };
  const update = (i, patch) => onChange(value.map((x, k) => (k === i ? { ...x, ...patch } : x)));

  return (
    <div className="ed-field">
      <Label label={field.label} help={field.help} />
      <div className="ed-photos">
        {value.map((item, i) => (
          <div key={i} className="ed-photo">
            <div className="ed-photo__img">
              {item[imageKey] ? <img src={item[imageKey]} alt="" loading="lazy" /> : <span>No photo</span>}
              <div className="ed-photo__tools">
                <IconButton title="Move left" onClick={() => onChange(move(value, i, -1))} disabled={i === 0}>&larr;</IconButton>
                <IconButton title="Move right" onClick={() => onChange(move(value, i, 1))} disabled={i === value.length - 1}>&rarr;</IconButton>
                <IconButton title="Remove photo" danger onClick={() => confirmRemove('photo') && onChange(value.filter((_, k) => k !== i))}>&times;</IconButton>
              </div>
            </div>
            <FilePicker className="ed-photo__change" onFiles={([url]) => update(i, { [imageKey]: url })}>Change photo</FilePicker>
            {captions.map((c) => (
              <label key={c.key} className="ed-photo__cap">
                <small>{c.label}</small>
                <input
                  className="ed-input ed-input--small"
                  value={item[c.key] || ''}
                  onChange={(e) => update(i, { [c.key]: e.target.value })}
                />
              </label>
            ))}
          </div>
        ))}
        <FilePicker className="ed-photo ed-photo--add" multiple onFiles={(urls) => onChange([...value, ...urls.map(makeItem)])}>
          <strong>+</strong>
          <span>Add photos</span>
        </FilePicker>
      </div>
    </div>
  );
}

function Groups({ field, value = [], onChange }) {
  const update = (i, patch) => onChange(value.map((x, k) => (k === i ? { ...x, ...patch } : x)));
  return (
    <div className="ed-field">
      <Label label={field.label} help={field.help} />
      <div className="ed-cards">
        {value.map((group, i) => (
          <div key={i} className="ed-card">
            <div className="ed-card__head">
              <input
                className="ed-input ed-input--title"
                placeholder={field.nameLabel}
                aria-label={field.nameLabel}
                value={group[field.nameKey] || ''}
                onChange={(e) => update(i, { [field.nameKey]: e.target.value })}
              />
              <div className="ed-card__tools">
                <IconButton title="Move up" onClick={() => onChange(move(value, i, -1))} disabled={i === 0}>&uarr;</IconButton>
                <IconButton title="Move down" onClick={() => onChange(move(value, i, 1))} disabled={i === value.length - 1}>&darr;</IconButton>
                <IconButton title={`Remove ${field.itemName}`} danger onClick={() => confirmRemove(`${field.itemName} and all its photos`) && onChange(value.filter((_, k) => k !== i))}>&times;</IconButton>
              </div>
            </div>
            <div className="ed-card__body">
              <PhotoGrid field={{ captions: field.captions }} value={group.photos || []} onChange={(photos) => update(i, { photos })} />
            </div>
          </div>
        ))}
        <button type="button" className="ed-add" onClick={() => onChange([...value, { [field.nameKey]: '', photos: [] }])}>+ {field.addLabel}</button>
      </div>
    </div>
  );
}

const TYPES = {
  text: TextField,
  textarea: TextField,
  select: SelectField,
  drive: DriveField,
  image: ImageField,
  textlist: TextList,
  cards: Cards,
  photos: PhotoGrid,
  groups: Groups,
};

export default function Field({ field, value, onChange }) {
  const Component = TYPES[field.type] || TextField;
  return <Component field={field} value={value} onChange={onChange} />;
}