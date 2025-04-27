export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let professors = [];
  let universities = [];

  try {
    const resProfessors = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors`,
      { cache: "force-cache" }
    );
    professors = await resProfessors.json();
  } catch (error) {
    console.error("Error fetching professors for sitemap:", error);
  }

  try {
    const resUniversities = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/universities`,
      { cache: "force-cache" }
    );
    universities = await resUniversities.json();
  } catch (error) {
    console.error("Error fetching universities for sitemap:", error);
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
    ...professors.map((professor) => ({
      url: `${baseUrl}/professor/${professor._id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...universities.map((university) => ({
      url: `${baseUrl}/university/${university._id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
