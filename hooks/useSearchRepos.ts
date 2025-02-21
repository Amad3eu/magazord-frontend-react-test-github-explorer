import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSearchRepos = (search: string) => {
  const { data, error } = useSWR(
    search ? `https://api.github.com/search/repositories?q=${search}` : null,
    fetcher
  );

  return {
    repos: data ? (Array.isArray(data.items) ? data.items : []) : [],
    isLoading: !error && !data,
    isError: error,
  };
};
