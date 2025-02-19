import { useRepoStore } from "../store/repoStore";

const RepoDetailsModal = () => {
  const { repoDetails, setRepoDetails } = useRepoStore();

  if (!repoDetails) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setRepoDetails(null)}>
          &times;
        </span>
        <h2>{repoDetails.name}</h2>
        <p>{repoDetails.description}</p>
        <p>Stars: {repoDetails.stargazers_count}</p>
        <p>Forks: {repoDetails.forks_count}</p>
        <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepoDetailsModal;
