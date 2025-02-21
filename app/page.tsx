"use client";
import { useState, useEffect } from "react";
import { useRepoStore } from "../store/repoStore";
import RepoList from "../components/RepoList";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import { Book, Star, Twitter, Link, MapPin, ArrowLeft, ArrowRight } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Repo {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  language: string | null;
}

export default function Home() {
  const { view, setView, fetchStarred } = useRepoStore();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { data: repos, error: reposError } = useSWR<Repo[]>(
    `https://api.github.com/users/amad3eu/repos?page=${page}&per_page=10`,
    fetcher
  );
  const { data: starred, error: starredError } = useSWR<Repo[]>(
    view === "starred"
      ? `https://api.github.com/users/amad3eu/starred?page=${page}&per_page=10`
      : null,
    fetcher
  );
  const { data: user, error: userError } = useSWR(
    "https://api.github.com/users/amad3eu",
    fetcher
  );

  useEffect(() => {
    if (repos || (view === "starred" && starred) || user) {
      setLoading(false);
    }
  }, [repos, starred, user, view]);

  // Filtrar repositórios com base no valor de busca, tipo e linguagem
  const filterRepos = (repos: Repo[]) =>
    repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase()) &&
        (type === "public" ? !repo.private : true) &&
        (type === "private" ? repo.private : true) &&
        (language ? repo.language === language : true)
    );

  const filteredRepos = Array.isArray(repos) ? filterRepos(repos) : [];
  const filteredStarred = Array.isArray(starred) ? filterRepos(starred) : [];

  // Buscar todas as linguagens usadas
  useEffect(() => {
    const currentRepos = view === "repos" ? repos : starred;
    if (Array.isArray(currentRepos)) {
      const usedLanguages = new Set<string>();
      currentRepos.forEach((repo) => {
        if (repo.language) {
          usedLanguages.add(repo.language);
        }
      });
      setLanguages(Array.from(usedLanguages));
    }
  }, [repos, starred, view]);

  if (reposError || starredError || userError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-red-500">Failed to load data</div>
      </div>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="loader"></div>
      </div>
    );

  const additionalLinks = [
    { label: "Blog", url: user?.blog, icon: <Link className="w-4 h-4" /> },
    {
      label: "Twitter",
      url: user?.twitter_username ? `https://twitter.com/${user.twitter_username}` : null,
      icon: <Twitter className="w-4 h-4" />,
    },
  ].filter((link) => link.url);

  return (
    <div className="min-h-screen container mx-auto flex flex-col sm:flex-row gap-8 p-4 bg-white dark:bg-gray-900">
      {/* Coluna Esquerda: Perfil do usuário */}
      {user && (
        <div className="profile-box sm:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold text-black dark:text-white text-center">
            {user.name}
          </h1>
          <p className="text-sm text-gray-800 dark:text-gray-400 mb-4 text-center">
            {user.bio}
          </p>
          {user.company && (
            <p className="text-sm text-gray-800 dark:text-gray-400 text-center">
              Company: {user.company}
            </p>
          )}
          {user.location && (
            <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-400 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            <p className="text-sm text-gray-800 dark:text-gray-400">
              Followers: {user.followers}
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-400">
              Following: {user.following}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {additionalLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 no-underline"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
      {/* Coluna Direita: Repositórios, botões, pesquisa e filtros */}
      <div className="repo-box sm:w-2/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <nav className="flex gap-4 mb-8">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              view === "repos"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => {
              setLoading(true);
              setView("repos");
              setPage(1);
            }}
          >
            <Book className="w-5 h-5" />
            Repositories
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              view === "starred"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => {
              setLoading(true);
              setView("starred");
              setPage(1);
              fetchStarred();
            }}
          >
            <Star className="w-5 h-5" />
            Starred
          </button>
        </nav>
        <div className="flex gap-4 mb-8 w-full">
          <SearchBar search={search} setSearch={setSearch} />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border rounded-full text-black dark:text-white bg-gray-100 dark:bg-gray-700"
          >
            <option value="">Type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border rounded-full text-black dark:text-white bg-gray-100 dark:bg-gray-700"
          >
            <option value="">Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <RepoList view={view} repos={filteredRepos} starred={filteredStarred} />
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-full flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-full flex items-center gap-2"
          >
            Próxima
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
