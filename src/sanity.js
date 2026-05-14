import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'muunjqsb',
  dataset: 'portfio-studio',
  useCdn: false, // false = always fresh data (no CDN cache)
  apiVersion: '2025-05-14',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
