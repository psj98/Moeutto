import React from "react";

interface SearchLocationPropsType {
 
}

const SearchLocation: React.FC<SearchLocationPropsType> = () => {

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue: any = event.target.value;

    //     onInputChange(newValue);
    // };


    return (
        <div className="flex">
            <img src="/images/search.png" alt="" />
            <input type="text" className="border border-black"   />
        </div>
      
    )
}

export default SearchLocation;