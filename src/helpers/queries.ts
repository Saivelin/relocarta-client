export const toQueryParams = (
  paramsObj?: Record<string, string | string[] | number>,
): string => {
  if (!paramsObj) {
    return '';
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(paramsObj)) {
    if (!value) {
      continue;
    }

    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((v) => params.append(key, v));
    } else {
      params.append(key, String(value));
    }
  }

  return `?${params.toString()}`;
};

export const getPaginationQueryParams = (page = '1', pageSize = 6) => {
  const pageNumber = Number(page) - 1;
  return {
    offset: String(pageNumber * pageSize),
    limit: String(pageSize),
  };
};
