export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return [
    {
      url: baseUrl,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/alluniversities`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notifications`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.6,
    },
  ];
}
