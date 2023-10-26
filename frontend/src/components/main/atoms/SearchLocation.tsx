import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

interface SearchLocationPropsType {
 
}

const SearchLocation: React.FC<SearchLocationPropsType> = () => {

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue: any = event.target.value;

    //     onInputChange(newValue);
    // };


    return (
        <div className="flex">
            <BiSearchAlt2 />
            <input type="text" className="border border-black"   />
        </div>
      
    )
}

export default SearchLocation;