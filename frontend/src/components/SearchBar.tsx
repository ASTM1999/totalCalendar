

function SearchBar({ onSearch }) {
    const handleSearch = (e: any) => {
        onSearch(e.target.value);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="search-button"
                onChange={handleSearch}
            />
            <button
                className="btn btn-outline-secondary"
                type="button"
                id="search-button"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
