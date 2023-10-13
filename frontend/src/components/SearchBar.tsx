
import { FormControl, InputGroup } from 'react-bootstrap';
// import { BiSearch } from 'react-icons/bi'; 

interface SearchProps {
    onSearch: any;
}

function SearchBar({ onSearch }: SearchProps) {
    const handleSearch = (e: any) => {
        onSearch(e.target.value);
    };

    return (
        <div className="input-group mb-3">
            {/* <input
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
            </button> */}

            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                    {/* <BiSearch /> */}
                </InputGroup.Text>
                <FormControl
                    // className='formSearch'
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </div>
    );
}

export default SearchBar;
