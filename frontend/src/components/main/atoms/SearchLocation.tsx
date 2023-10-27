import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

interface SearchLocationPropsType {
    handleInputChange: (newValue: any) => void;
}

const SearchLocation: React.FC<SearchLocationPropsType> = ({ handleInputChange }) => {
        const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        handleInputChange(newValue);
    }

    return (
        <div className="flex">
            <BiSearchAlt2 size={25} />
            <input type="text" className="border border-black" onChange={handleSearch} />
        </div>
      
    )
}

export default SearchLocation;