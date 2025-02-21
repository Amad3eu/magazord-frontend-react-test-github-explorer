import { useRouter } from "next/navigation";
import { Star, GitFork } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
}

const RepoList = ({
  view,
  repos,
  starred,
}: {
  view: string;
  repos: Repo[];
  starred: Repo[];
}) => {
  const router = useRouter();

  // Função para lidar com o clique em um repositório
  const handleRepoClick = (owner: string, repoName: string) => {
    router.push(`/repo/${owner}/${repoName}`);
  };

  // Determinar qual lista exibir com base na visualização
  const list = view === "repos" ? repos : starred;

  if (!Array.isArray(list)) {
    return <div>No repositories available.</div>;
  }

  return (
    <div className="w-full max-w-2xl">
      {list.map((repo) => (
        <div
          key={repo.id}
          className="border rounded-lg shadow-md p-4 mb-4 bg-white dark:bg-gray-800"
        >
          <h2
            className="text-xl font-bold text-black dark:text-white cursor-pointer hover:text-blue-500"
            onClick={() => handleRepoClick(repo.owner.login, repo.name)}
          >
            {repo.owner.login} / {repo.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {repo.description}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-black dark:text-white">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-black dark:text-white">
              <GitFork className="w-4 h-4 text-green-500" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
