"use client";
import { useState } from "react";
import { useRepoStore } from "../store/repoStore";
import RepoList from "../components/RepoList";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import RepoDetailsModal from "@/components/RepoDetailsModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { view, setView, fetchStarred } = useRepoStore();
  const [search, setSearch] = useState("");

  const { data: repos } = useSWR("https://api.github.com/users/amad3eu/repos", fetcher);
  const { data: starred } = useSWR(view === "starred" ? "https://api.github.com/users/amad3eu/starred" : null, fetcher);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <SearchBar search={search} setSearch={setSearch} />
        <div>
          <button onClick={() => setView("repos")}>Repositories</button>
          <button
            onClick={() => {
              setView("starred");
              fetchStarred();
            }}
          >
            Starred
          </button>
        </div>
        <RepoList view={view} repos={repos} starred={starred} />
        <RepoDetailsModal />
      </main>
    </div>
  );
}
