const API_URL = 'https://graphql.datocms.com';
const API_TOKEN = process.env.DATOCMS_READONLY_TOKEN;

export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

type QueryConfig = {
  variables?: Record<string, unknown>;
};

function specialHeaders(): Record<string, string> {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    return {};
  }
  return {
    'X-Environment': 'staging',
    'X-Include-Drafts': 'true',
  };
}

type CmsError = {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: {
    code: string;
    typeName: string;
  };
};

export class QueryError extends Error {
  constructor(public readonly errors: CmsError[]) {
    super();
  }
}

export async function query<T = any>(queryString: string, { variables }: QueryConfig = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
    ...specialHeaders(),
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new QueryError(json.errors);
  }
  return json.data as T;
}
