import React from 'react';
import ItemPhoto from '../itemPhoto/ItemPhoto';
import DownloadButton from '../downloadButton/DownloadButton';

import './SearchResult.css';

const SearchResult = (props) => {

    const {
        storeFromApp,
        loadSearchPhotos,
        changeLikeStatus,
        loadPhotoDetails,
        getDateCreated } = props;

    const {searchResult} = storeFromApp;

     let listPhotos = null;
 

    if(searchResult.searchPhotos.length !== 0){
        listPhotos = (
            <ItemPhoto
                photos={searchResult.searchPhotos}
                getDateCreated={getDateCreated} 
                changeLikeStatus={changeLikeStatus} 
                loadPhotoDetails={loadPhotoDetails}
            />
        );    
    }
    
    return (
        <main className="main">
            <section className="skils-section">
                <div className="skils-section__fixed-container">
                    <div  className="container">
                        <div className="row">
                            <div className="col">         
                                {listPhotos}
                            </div>
                        </div>                           
                    </div>
                    <DownloadButton 
                    searchQwery={searchResult.qwery}
                    funcLoadPhotos={loadSearchPhotos}
                    />
                </div>
            </section>        
        </main> 
    );
}

export default SearchResult;