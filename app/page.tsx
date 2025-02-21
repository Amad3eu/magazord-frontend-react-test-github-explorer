"use client";
import { useState, useEffect } from "react";
import { useRepoStore } from "../store/repoStore";
import RepoList from "../components/RepoList";
import useSWR from "swr";
import SearchBar from "@/components/SearchBar";
import RepoDetailsModal from "@/components/RepoDetailsModal";
import GitHubLogo from "@/components/GitHubLogo";
import { Book, Star, Twitter, Link, MapPin } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { view, setView, fetchStarred } = useRepoStore();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  const { data: repos, error: reposError } = useSWR(
    "https://api.github.com/users/amad3eu/repos",
    fetcher
  );
  const { data: starred, error: starredError } = useSWR(
    view === "starred" ? "https://api.github.com/users/amad3eu/starred" : null,
    fetcher
  );
  const { data: user, error: userError } = useSWR(
    "https://api.github.com/users/amad3eu",
    fetcher
  );

  // Filtrar repositórios com base no valor de busca, tipo e linguagem
  const filteredRepos = repos?.filter(
    (repo: { name: string; private: boolean; language: string | null }) =>
      repo.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "public" ? !repo.private : true) &&
      (type === "private" ? repo.private : true) &&
      (language ? repo.language === language : true)
  );

  // Buscar todas as linguagens usadas
  useEffect(() => {
    if (repos) {
      const usedLanguages = new Set<string>();
      repos.forEach((repo: { language: string | null }) => {
        if (repo.language) {
          usedLanguages.add(repo.language);
        }
      });
      setLanguages(Array.from(usedLanguages));
    }
  }, [repos]);

  if (reposError || starredError || userError)
    return <div>Failed to load data</div>;
  if (!repos || (view === "starred" && !starred) || !user)
    return <div>Loading...</div>;

  const additionalLinks = [
    { label: "Blog", url: user.blog, icon: <Link className="w-4 h-4" /> },
    {
      label: "Twitter",
      url: `https://twitter.com/${user.twitter_username}`,
      icon: <Twitter  className="w-4 h-4" />,
    },
  ].filter((link) => link.url);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <GitHubLogo />
        </div>
      </header>
      <main className="p-8 pb-20 sm:p-20 flex flex-col gap-8 items-center sm:items-start bg-white max-w-7xl mx-auto">
        <div className="container flex gap-8">
          {/* Coluna Esquerda: Perfil do usuário */}
          {user && (
            <div className="profile-box w-1/3 bg-white p-4 rounded-lg shadow-md">
              <img
                src={user.avatar_url}
                alt="User Avatar"
                className="w-16 h-16 rounded-full mb-4"
              />
              <h1 className="text-3xl font-bold text-black">{user.name}</h1>
              <p className="text-sm text-gray-800 mb-4">{user.bio}</p>
              {user.company && (
                <p className="text-sm text-gray-800">Company: {user.company}</p>
              )}
              {user.location && (
                <div className="flex items-center gap-2 text-sm text-gray-800 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <p className="text-sm text-gray-800">
                  Followers: {user.followers}
                </p>
                <p className="text-sm text-gray-800">
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
          <div className="repo-box w-2/3 bg-white p-4 rounded-lg shadow-md">
            <nav className="flex gap-4 mb-8">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  view === "repos"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() => setView("repos")}
              >
                <Book className="w-5 h-5" />
                Repositories
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  view === "starred"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() => {
                  setView("starred");
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
                className="px-4 py-2 border rounded-full text-black bg-gray-100"
              >
                <option value="">Type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border rounded-full text-black bg-gray-100"
              >
                <option value="">Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <RepoList view={view} repos={filteredRepos} starred={starred} />
          </div>
        </div>
        <RepoDetailsModal />
      </main>
    </div>
  );
}
