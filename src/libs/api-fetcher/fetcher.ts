export const apiFetch = async (path: string, init?: RequestInit) => {
  return await fetch(`${process.env.API_HOST}${path}`, {
    next: {
      revalidate: 5,
    },
    ...init,
  });
};
