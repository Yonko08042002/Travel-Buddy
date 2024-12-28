export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: 'https://example.com/sitemap.xml',
    host: 'https://example.com'
  };
}
