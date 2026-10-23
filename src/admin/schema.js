/*
  What the editor shows, page by page.
  Only these fields are editable; everything technical stays hidden.
*/

const photoCaptions = [
  { key: 'title', label: 'Caption' },
  { key: 'label', label: 'Small label' },
];

const workFields = [
  { path: 'image', type: 'image', label: 'Poster or thumbnail' },
  { path: 'title', type: 'text', label: 'Title' },
  { path: 'year', type: 'text', label: 'Tag', placeholder: 'e.g. Feature Film, 2025' },
  { path: 'role', type: 'text', label: 'Her role' },
  { path: 'meta', type: 'text', label: 'Details', placeholder: 'e.g. A film by ...' },
  { path: 'link', type: 'text', label: 'Link to watch (optional)', placeholder: 'https://...' },
];
const workTemplate = { title: '', year: '', role: '', meta: '', platform: '', image: '', link: '' };

export const CATEGORY_OPTIONS = [
  { value: 'intro', label: 'Introduction (showreel only)' },
  { value: 'tv', label: 'Web and TV Series' },
  { value: 'reality', label: 'Reality Shows' },
  { value: 'ovc', label: 'OVC' },
  { value: 'ads', label: 'TVC and Ads' },
  { value: 'movies', label: 'Movies' },
  { value: 'youtube', label: 'YouTube Series' },
];

export const pages = [
  {
    group: 'About her',
    items: [
      {
        id: 'home',
        key: 'profile',
        title: 'Home screen',
        help: 'The first screen visitors see.',
        fields: [
          { path: 'firstName', type: 'text', label: 'First name', help: 'Shown big on the first screen.' },
          { path: 'lastName', type: 'text', label: 'Last name' },
          { path: 'fullName', type: 'text', label: 'Full name', help: 'Used in small text around the site.' },
          { path: 'tagline', type: 'textarea', label: 'Short line under her name' },
          { path: 'cutouts.hero', type: 'image', label: 'Main photo', keepPng: true },
        ],
      },
      {
        id: 'filmstrip',
        key: 'marquee',
        title: 'Film strip',
        help: 'The words that scroll across the moving film strip.',
        fields: [{ path: 'moments', type: 'textlist', label: 'Words', addLabel: 'Add words' }],
      },
      {
        id: 'about',
        key: 'profile',
        title: 'About',
        fields: [
          { path: 'bio', type: 'textlist', multiline: true, label: 'About text', help: 'Each box is one paragraph.', addLabel: 'Add a paragraph' },
          { path: 'cutouts.about', type: 'image', label: 'About photo', keepPng: true },
          { path: 'since', type: 'text', label: 'Small text beside the photo' },
          { path: 'education.subject', type: 'text', label: 'Studying' },
          { path: 'education.institute', type: 'text', label: 'University' },
          {
            path: 'stats',
            type: 'cards',
            label: 'Numbers',
            help: 'For example: 04 and "TVCs and Ads".',
            addLabel: 'Add a number',
            template: { value: '', label: '' },
            fields: [
              { path: 'value', type: 'text', label: 'Number' },
              { path: 'label', type: 'text', label: 'What it counts' },
            ],
          },
        ],
      },
      {
        id: 'contact',
        key: 'profile',
        title: 'Contact',
        fields: [
          { path: 'contact.email', type: 'text', label: 'Email' },
          { path: 'contact.phone', type: 'text', label: 'Phone' },
          { path: 'contact.address', type: 'text', label: 'Based in' },
          { path: 'cutouts.contact', type: 'image', label: 'Contact photo', keepPng: true },
          {
            path: 'socials',
            type: 'cards',
            label: 'Social links',
            addLabel: 'Add a link',
            template: { label: '', url: '' },
            fields: [
              { path: 'label', type: 'text', label: 'Name', placeholder: 'e.g. Instagram' },
              { path: 'url', type: 'text', label: 'Link', placeholder: 'https://...' },
            ],
          },
        ],
      },
    ],
  },
  {
    group: 'Photos',
    items: [
      { id: 'headshots', key: 'headshots', title: 'Headshots', fields: [{ path: '', type: 'photos', captions: photoCaptions }] },
      { id: 'modelling', key: 'modelling', title: 'Modelling', fields: [{ path: '', type: 'photos', captions: photoCaptions, template: { span: 'tall' } }] },
      {
        id: 'albums',
        key: 'albums',
        title: 'Photoshoots',
        help: 'Each album becomes a tab in the Photoshoots section.',
        fields: [{ path: '', type: 'groups', nameKey: 'label', nameLabel: 'Album name', addLabel: 'Add an album', itemName: 'album', captions: [] }],
      },
      { id: 'makeup', key: 'makeup', title: 'Makeup', fields: [{ path: '', type: 'photos', captions: photoCaptions }] },
      { id: 'theatre', key: 'theatre', title: 'Theatre', fields: [{ path: '', type: 'photos', captions: photoCaptions }] },
      { id: 'costars', key: 'costars', title: 'Co-stars', fields: [{ path: '', type: 'photos', captions: [{ key: 'title', label: 'Co-star name' }] }] },
      {
        id: 'competitions',
        key: 'competitions',
        title: 'Competition',
        fields: [{ path: '', type: 'groups', nameKey: 'name', nameLabel: 'Competition name', addLabel: 'Add a competition', itemName: 'competition', captions: photoCaptions }],
      },
    ],
  },
  {
    group: 'Videos and work',
    items: [
      {
        id: 'reel',
        key: 'reel',
        title: 'Videos',
        help: 'Videos from Google Drive. They play in the Showreel and also appear in the Work tabs.',
        fields: [
          {
            path: '',
            type: 'cards',
            addLabel: 'Add a video',
            template: { id: '', title: '', category: 'tv', type: '', platform: '', role: '', meta: '' },
            fields: [
              { path: 'id', type: 'drive', label: 'Google Drive link', help: 'In Drive: Share, set to "Anyone with the link", then Copy link and paste it here.' },
              { path: 'title', type: 'text', label: 'Title' },
              { path: 'category', type: 'select', label: 'Show under', options: CATEGORY_OPTIONS },
              { path: 'type', type: 'text', label: 'Type', placeholder: 'e.g. Web Series, TVC' },
              { path: 'platform', type: 'text', label: 'Channel or brand', placeholder: 'e.g. Hoichoi' },
              { path: 'role', type: 'text', label: 'Her role' },
              { path: 'meta', type: 'text', label: 'Details' },
            ],
          },
        ],
      },
      {
        id: 'movies',
        key: 'works',
        title: 'Movies',
        help: 'Films shown in the Movies tab.',
        fields: [{ path: 'extra.movies', type: 'cards', addLabel: 'Add a movie', template: workTemplate, fields: workFields }],
      },
      {
        id: 'posters',
        key: 'works',
        title: 'Posters',
        help: 'Shown in the Posters tab.',
        fields: [
          {
            path: 'extra.posters',
            type: 'photos',
            imageKey: 'image',
            captions: [{ key: 'title', label: 'Title' }],
            template: { year: 'Poster', role: '', meta: '', platform: 'Poster', link: '' },
          },
        ],
      },
      {
        id: 'talk',
        key: 'works',
        title: 'Talk shows',
        help: 'Podcasts and talk shows, shown in the Talk Shows tab.',
        fields: [{ path: 'extra.talk', type: 'cards', addLabel: 'Add a show', template: workTemplate, fields: workFields }],
      },

      {
        id: 'youtube',
        key: 'works',
        title: 'YouTube series',
        help: 'Shown in the YouTube Series tab. The tab stays hidden while this is empty.',
        fields: [{ path: 'extra.youtube', type: 'cards', addLabel: 'Add a series', template: workTemplate, fields: workFields }],
      },
    ],
  },
  {
    group: 'Press',
    items: [
      {
        id: 'press',
        key: 'press',
        title: 'Press',
        fields: [
          { path: 'image', type: 'image', label: 'Article photo' },
          { path: 'source', type: 'text', label: 'Published by', placeholder: 'e.g. Dhaka Dhamaka' },
          { path: 'quote', type: 'textarea', label: 'Quote from the article' },
          { path: 'link', type: 'text', label: 'Link to the full article', placeholder: 'https://...' },
          {
            path: 'highlights',
            type: 'cards',
            label: 'Highlights',
            addLabel: 'Add a highlight',
            template: { value: '', text: '' },
            fields: [
              { path: 'value', type: 'text', label: 'Big text', placeholder: 'e.g. Top 10' },
              { path: 'text', type: 'textarea', label: 'Description' },
            ],
          },
        ],
      },
    ],
  },
];

export const allPages = pages.flatMap((g) => g.items);

export const pagesUsingKey = (key) => allPages.filter((p) => p.key === key).map((p) => p.title);
