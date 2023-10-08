interface BuildQueryParams {
  type: string;
  query: string;
  category: string;
  page: number;
  perPage?: number;
}

export function buildQuery(params: BuildQueryParams) {
  const { type, query, category, page = 1, perPage = 10 } = params;

  const condations = [`*[_type=="${type}"]`];

  if (query) condations.push(`title match "*${query}*"`);

  if (category && category !== "all")
    condations.push(`category == "*${category}*"`);

  const offset = (page - 1) * perPage;
  const limit = perPage;

  if (condations.length > 1) {
    return `${condations[0]} && (${condations
      .slice(1)
      .join(" &&")})][${offset}...${limit}]`;
  } else {
    return `${condations[0]}[${offset}...${limit}]`;
  }
}
