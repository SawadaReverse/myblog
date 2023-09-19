import { headers } from 'next/headers';

export const apiFetch = async (path: string, init?: RequestInit) => {
  const headersData = headers();
  const host = headersData.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return await fetch(`${protocol}://${host}${path}`, {
    next: {
      revalidate: 5,
    },
    ...init,
  });
};
