import React from 'react';
import { Link } from "react-router-dom";

import './Search.css'

const Search = (props) => {

	const { 
		handlerInputsValue, 
		searchQwery,
		loadSearchPhotos, 
		handlerClickSearch } = props;

	return (
		<div className="poisk2">
	        <input
	            onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)} 
	            id="search"  
	        	type="text" 
	        	className="poisk" 
	        	placeholder="Поиск по теме"
	        	aria-label="Search" aria-describedby="button-search"/>
        	
            <Link to="/search-result/">
                <div
                    className="lupa"
                    onClick={()=>{
                        let elem = document.getElementById("search");
                        if(elem.value !== ''){
                            handlerClickSearch();
                            loadSearchPhotos(searchQwery);
                            elem.value = '';
                        }
                    }}
                />
            </Link>	        	
      	</div>
	);
}

export default Search;