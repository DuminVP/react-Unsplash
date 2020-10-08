import React from 'react';

import './DownloadButton.css';

const DownloadButton = ({searchQwery, funcLoadPhotos}) => {

	// Кнопка загрузить еще для результатов поиска
	if(searchQwery){ 
		return(
			<button 
	      		className="btn-load"  
	      		onClick={()=>funcLoadPhotos(searchQwery)}>
	      		Загрузить еще
	    	</button>
		);
	}

	// Кнопка загрузить еще для главной страницы
	else{ 
		return(
			<button 
	      		className="btn-load"  
	      		onClick={()=>funcLoadPhotos()}>
	      		Загрузить еще
	    	</button>
		);
	}
}

export default DownloadButton;