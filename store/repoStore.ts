import { devtools } from "zustand/middleware";
import useSWR from "swr";
import { create } from "zustand";

interface RepoDetails {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

interface RepoStore {
  repos: RepoDetails[];
  starred: RepoDetails[];
  view: string;
  repoDetails: RepoDetails | null;
  setView: (view: string) => void;
  setRepoDetails: (repo: RepoDetails | null) => void;
  setRepos: (repos: RepoDetails[]) => void;
  fetchStarred: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useRepoStore = create<RepoStore>()(
  devtools((set) => ({
    repos: [],
    starred: [],
    view: "repos",
    repoDetails: null,
    setView: (view) => set({ view }),
    setRepoDetails: (repo) => set({ repoDetails: repo }),
    setRepos: (repos) => set({ repos }),
    fetchStarred: async () => {
      const data = await fetcher("https://api.github.com/users/amad3eu/starred");
      set({ starred: Array.isArray(data) ? data : [] });
    },
  }))
);

export const useRepos = () => {
  const { data } = useSWR("https://api.github.com/users/amad3eu/repos", fetcher);
  return data || [];
};
