
import { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
// import { BiSearch } from 'react-icons/bi'; 

interface SearchProps {
    onSearch: (searchValue: string) => void;

}

function SearchBar({ onSearch }: SearchProps) {
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        onSearch(searchValue);
    }, [searchValue, onSearch])
    return (
        <div className="card-search">
            <img src="../../public/search.svg" alt="search" style={{ width: "24px", marginRight: "10px" }} />
            <InputGroup>
                <InputGroup.Text id="basic-addon1">
                    {/* <BiSearch /> */}
                </InputGroup.Text>
                <FormControl
                    placeholder="Search..."
                    aria-label="Search..."
                    aria-describedby="basic-addon1"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </InputGroup>
        </div>
    );
}

export default SearchBar;
