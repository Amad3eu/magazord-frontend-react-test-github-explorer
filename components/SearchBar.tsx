import { useRepoStore } from "../store/repoStore";
import { useSearchRepos } from "../hooks/useSearchRepos";

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (value: string) => void }) => {
  const { setRepos } = useRepoStore();
  const { repos } = useSearchRepos(search);

  // Função para lidar com a submissão do formulário de busca
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRepos(repos);
  };

  // Função para lidar com a tecla Enter no campo de busca
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setRepos(repos);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search repositories..."
        aria-label="Search repositories"
        className="w-full px-4 py-2 border rounded text-black dark:text-white bg-gray-100 dark:bg-gray-700"
      />
    </form>
  );
};

export default SearchBar;
