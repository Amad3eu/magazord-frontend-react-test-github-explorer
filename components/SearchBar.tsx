import { useRepoStore } from "../store/repoStore";

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (value: string) => void }) => {
  const { setRepos } = useRepoStore();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    setRepos(Array.isArray(data.items) ? data.items : []);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as unknown as React.FormEvent<HTMLFormElement>);
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
        className="w-full px-4 py-2 border rounded text-black dark:text-white bg-gray-100 dark:bg-gray-700"
      />
    </form>
  );
};

export default SearchBar;
