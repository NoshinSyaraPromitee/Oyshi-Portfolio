import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, TABLE } from '../lib/supabase';
import { defaults } from './defaults';

const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

export const deepMerge = (base, saved) => {
  if (!isObject(base) || !isObject(saved)) return saved;
  const out = { ...base };
  Object.keys(saved).forEach((k) => {
    out[k] = isObject(base[k]) && isObject(saved[k]) ? deepMerge(base[k], saved[k]) : saved[k];
  });
  return out;
};

export const mergeContent = (rows = []) => {
  const content = { ...defaults };
  rows.forEach(({ key, data }) => {
    if (!(key in defaults) || data == null) return;
    content[key] = deepMerge(defaults[key], data);
  });
  return content;
};

const ContentContext = createContext({ content: defaults, ready: true });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaults);
  const [ready, setReady] = useState(!supabase);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from(TABLE)
      .select('key, data')
      .then(({ data, error }) => {
        if (!alive) return;
        if (!error && data) setContent(mergeContent(data));
        setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  return <ContentContext.Provider value={{ content, ready }}>{children}</ContentContext.Provider>;
}

export const useContent = (key) => useContext(ContentContext).content[key];
export const useContentReady = () => useContext(ContentContext).ready;
