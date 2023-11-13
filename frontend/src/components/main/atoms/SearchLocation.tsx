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
        <div className="flex items-center">
            <BiSearchAlt2 size={30} className="text-pink z-99 absolute ms-2" />
            <input type="text" 
                className="bg-gray-button rounded-2xl h-[40px] shadow-md text-gray-dark ps-10 flex items-center justify-center" 
                onChange={handleSearch} 
                placeholder="주소를 검색하세요"
            />
        </div>
      
    )
}

export default SearchLocation;