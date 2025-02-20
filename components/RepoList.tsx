import { useRepoStore } from "../store/repoStore";
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

const RepoList = ({ view, repos, starred }: { view: string, repos: Repo[], starred: Repo[] }) => {
  const { setRepoDetails } = useRepoStore();

  // Function to handle click on a repository
  const handleRepoClick = async (repoName: string) => {
    const response = await fetch(
      `https://api.github.com/repos/amad3eu/${repoName}`
    );
    const data = await response.json();
    setRepoDetails(data);
  };

  // Determine which list to display based on the view
  const list = view === "repos" ? repos : starred;

  if (!list) return null;

  return (
    <div className="w-full max-w-2xl">
      {list.map((repo) => (
        <div key={repo.id} className="border rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold text-black cursor-pointer hover:text-blue-500" onClick={() => handleRepoClick(repo.name)}>
            {repo.owner.login} / {repo.name}
          </h2>
          <p className="text-sm text-gray-600">{repo.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-black">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-black">
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
