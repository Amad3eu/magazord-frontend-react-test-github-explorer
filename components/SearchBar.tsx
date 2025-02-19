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

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search repositories..."
      />
    </form>
  );
};

export default SearchBar;
