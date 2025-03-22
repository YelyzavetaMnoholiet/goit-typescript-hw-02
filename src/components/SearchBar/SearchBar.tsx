import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  onSubmit: (query: string) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search query!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          placeholder="Search images and photos"
          autoFocus
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
