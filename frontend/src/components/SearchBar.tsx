
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
        <div className="card-search">
            <img src="../../public/search.svg" alt="search" style={{ width: "24px", marginRight: "10px" }} />
            <InputGroup >
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
