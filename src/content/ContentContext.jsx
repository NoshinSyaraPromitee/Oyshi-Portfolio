import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, TABLE } from '../lib/supabase';
import { defaults } from './defaults';

const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

export const mergeContent = (rows = []) => {
  const content = { ...defaults };
  rows.forEach(({ key, data }) => {
    if (!(key in defaults) || data == null) return;
    content[key] = isObject(defaults[key]) && isObject(data) ? { ...defaults[key], ...data } : data;
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
