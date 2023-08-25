export const formatRegionAndCity = (region: string, city?: string) => {
  if (city) {
    return `${city}, ${region} `;
  }

  return region;
};
