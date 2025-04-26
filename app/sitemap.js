export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let professors = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors`,
      {
        cache: "force-cache",
      }
    );
    professors = await res.json();
  } catch (error) {
    console.error("Error fetching professors for sitemap:", error);
  }

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
    // Add all professor URLs
    ...professors.map((professor) => ({
      url: `${baseUrl}/professor/${professor._id}`,
      lastModified: new Date(professor.updatedAt || new Date()), // use updatedAt if available
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
