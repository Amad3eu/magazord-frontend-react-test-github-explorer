"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
}

export default function RepoDetailsPage() {
  const { owner, repoName } = useParams();
  const router = useRouter();

  const { data: repoDetails, error } = useSWR(
    owner && repoName
      ? `https://api.github.com/repos/${owner}/${repoName}`
      : null,
    fetcher
  );

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
    <div className="min-h-screen container mx-auto flex flex-col sm:flex-row gap-8 p-4 bg-white dark:bg-gray-900">
      {/* Coluna Esquerda: Perfil do repositório */}
      <div className="profile-box sm:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <img
          src={repoDetails.owner.avatar_url}
          alt={repoDetails.owner.login}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold text-black dark:text-white text-center">
          {repoDetails.full_name}
        </h1>
        <p className="text-sm text-gray-800 dark:text-gray-400 mb-4 text-center">
          {repoDetails.description}
        </p>
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
      </div>
      {/* Coluna Direita: Issues */}
      <div className="repo-box sm:w-2/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            Issues
          </h2>
          {issues?.length === 0 ? (
            <p className="text-gray-800 dark:text-gray-400">No issues found</p>
          ) : (
            <div className="space-y-4">
              {issues?.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 no-underline"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-semibold">{issue.title}</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-400">
                      {issue.user.login}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
