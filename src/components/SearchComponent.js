import React, { useState } from 'react';
import SearchBox from 'react-search-box';

const SearchComponent = ({ data,setSelectedUsers }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (value) => {
    setSearchValue(value);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <SearchBox
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearch}
      />

      {filteredData.map((item) => (
        <div key={item._id} onClick={()=>{setSelectedUsers(item)}}>{item.name}</div>
      ))}
    </div>
  );
};

export default SearchComponent;
