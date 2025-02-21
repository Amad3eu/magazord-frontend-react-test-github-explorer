import { useRepoStore } from "../store/repoStore";

const RepoDetailsModal = () => {
  const { repoDetails, setRepoDetails } = useRepoStore();

  if (!repoDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full text-black relative">
        <button
          className="absolute top-2 right-2 text-black"
          onClick={() => setRepoDetails(null)}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{repoDetails.name}</h2>
        <p className="mb-4">{repoDetails.description}</p>
        <p className="mb-2">Stars: {repoDetails.stargazers_count}</p>
        <p className="mb-4">Forks: {repoDetails.forks_count}</p>
        <a
          href={repoDetails.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepoDetailsModal;
