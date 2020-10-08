import React from 'react';

import ItemPhoto from '../itemPhoto/ItemPhoto';

import DownloadButton from '../downloadButton/DownloadButton';

import './Main.css';

// главная страница с фотографиями

const ListPhotos = (props) => {

    const {
        storeFromApp,
        loadPhotoFromApp,
        changeLikeStatus,
        loadPhotoDetails,
        getDateCreated } = props;
  
    const {photos} = storeFromApp;
  
    let listPhotos = null;
    console.log(photos.length);
  
    if(photos.length !== 0){
        listPhotos = (
            <ItemPhoto
                photos={photos}  
                getDateCreated={getDateCreated} 
                changeLikeStatus={changeLikeStatus} 
                loadPhotoDetails={loadPhotoDetails}
            />
        );
    } else if (photos.length === 0 ) {
        listPhotos = (
            <ItemPhoto
                photos={photos}  
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
                    <DownloadButton funcLoadPhotos={loadPhotoFromApp}/>    
                </div>                
            </section>                  
        </main>                
    );
};
  
export default ListPhotos;

