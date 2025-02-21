"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RepoDetailsPage() {
  const { owner, repoName } = useParams();
  const router = useRouter();

  const { data: repoDetails, error } = useSWR(
    owner && repoName
      ? `https://api.github.com/repos/${owner}/${repoName}`
      : null,
    fetcher
  );

  interface Issue {
    id: number;
    html_url: string;
    title: string;
    user: {
      login: string;
    };
  }

  const { data: issues } = useSWR<Issue[]>(
    owner && repoName
      ? `https://api.github.com/repos/${owner}/${repoName}/issues`
      : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      console.error("Failed to load repository details:", error);
    }
  }, [error]);

  if (!repoDetails || !repoDetails.owner) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-gray-100 p-6 flex flex-col items-center">
      {/* Cabeçalho com botão de voltar */}
      <header className="mb-10 flex items-center w-full max-w-4xl">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
      </header>

      {/* Informações do repositório */}
      <section className="flex flex-col items-center text-center mb-12 w-full max-w-4xl">
        <img
          src={repoDetails.owner.avatar_url}
          alt={repoDetails.owner.login}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-4xl font-semibold">{repoDetails.full_name}</h1>
        <p className="text-gray-800 dark:text-gray-400 mb-6">{repoDetails.description}</p>

        <div className="flex gap-10">
          <div>
            <p className="text-2xl font-bold">{repoDetails.stargazers_count}</p>
            <p className="text-gray-800 dark:text-gray-400">Stars</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{repoDetails.forks_count}</p>
            <p className="text-gray-800 dark:text-gray-400">Forks</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {repoDetails.open_issues_count}
            </p>
            <p className="text-gray-800 dark:text-gray-400">Issues abertas</p>
          </div>
        </div>
      </section>

      {/* Lista de Issues */}
      <section className="space-y-4 w-full max-w-4xl">
        {issues?.map((issue) => (
          <button
            key={issue.id}
            onClick={() => window.open(issue.html_url, "_blank")}
            className="w-full text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{issue.title}</p>
              <p className="text-gray-800 dark:text-gray-400">{issue.user.login}</p>
            </div>
            <span>&rarr;</span>
          </button>
        ))}
      </section>
    </div>
  );
}
