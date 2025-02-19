import { useRepoStore } from "../store/repoStore";

interface Repo {
  id: number;
  name: string;
}

const RepoList = ({ view, repos, starred }: { view: string, repos: Repo[], starred: Repo[] }) => {
  const { setRepoDetails } = useRepoStore();

  const handleRepoClick = async (repoName: string) => {
    const response = await fetch(
      `https://api.github.com/repos/amad3eu/${repoName}`
    );
    const data = await response.json();
    setRepoDetails(data);
  };

  const list = view === "repos" ? repos : starred;

  if (!list) return null;

  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      {list.map((repo) => (
        <li key={repo.id} onClick={() => handleRepoClick(repo.name)}>
          {repo.name}
        </li>
      ))}
    </ol>
  );
};

export default RepoList;
