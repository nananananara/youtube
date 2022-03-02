import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Header({onSearch}) {
    const inputRef = useRef();
    const handleSearch = ()=> {
        const value = inputRef.current.value;
        onSearch(value)
    }
    const onClick = () =>{
        handleSearch();
    }
    const onKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }
    let history = useHistory();
  return (
    <header id="header">
        <div className="leftUtil"></div>
        <div className="righttUtil"></div>
        <div className="search">
            <input type="text" type="search" placeholder="검색" onKeyPress={onKeyPress} ref={inputRef} />
            <button type="submit" onClick={onClick}>검색</button>
        </div>
    </header>
  );
}

export default Header;


