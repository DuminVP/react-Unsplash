import React from 'react';
import { Link } from "react-router-dom";
import Masonry from 'react-masonry-component';

import './ItemPhoto.css';


const ItemPhoto = (props) => { // отдельное фото

    const {
        photos,
        getDateCreated,
        changeLikeStatus,
        loadPhotoDetails } = props

    let listPhotos = null;

    if(photos.length !== 0){
        console.log("загрузка фото без входа")
        console.log(photos)
        
        listPhotos = photos.map((item, index)=>{
            return (
                <div className="photo" key={index}>
                    <Link to={`/photo/${item.id}`}>
                        <img
                            src={item.urls.small}
                            className="photo_item" alt=""
                            onClick={()=>loadPhotoDetails(item.id)} />
                    </Link>
                    <div className="photo_profile">
                        <img src={item.user.profile_image.small} alt="avatar" className="avatar1"/>
                        <span className="photo_profile-link">
                            <a href={item.user.links.html}>{item.user.first_name}</a>
                        </span>
                    </div>
                    <div className="photo_date">
                        <span>
                            {getDateCreated(item.created_at)}
                        </span>
                    </div>
                    <div className="photo_like">
                        {
                        item.liked_by_user ?
                            <button
                                onClick={()=>changeLikeStatus(item.id, item.liked_by_user)}
                                className="photo_like-button like">
                                <i className="fas fa-heart"></i>{item.likes}{" "}
                            </button>
                        :
                            <button
                                onClick={()=>changeLikeStatus(item.id, item.liked_by_user)}
                                className="photo_like-button">
                                <i className="fas fa-heart"></i>{item.likes}{" "}
                            </button>
                        }
                    </div>
                </div>
            )
          });
    } else if(photos.length === 0) {
        console.log("загрузить фото со входом")
        listPhotos = photos.map((item, index)=>{
            return (
                <div className="photo" key={index}>
                    <Link to={`/photo/${item.id}`}>
                        <img
                            src={item.urls.small}
                            className="photo_item" alt=""
                            onClick={()=>loadPhotoDetails(item.id)} />
                    </Link>
                    <div className="photo_profile">
                        <img src={item.user.profile_image.small} alt="avatar" className="avatar1"/>
                        <span className="photo_profile-link">
                            <a href={item.user.links.html}>{item.user.first_name}</a>
                        </span>
                    </div>
                    <div className="photo_date">
                        <span>
                            {getDateCreated(item.created_at)}
                        </span>
                    </div>
                    <div className="photo_like">
                        {
                        item.liked_by_user ?
                            <button
                                onClick={()=>changeLikeStatus(item.id, item.liked_by_user)}
                                className="photo_like-button like">
                                <i className="fas fa-heart"></i>{item.likes}{" "}
                            </button>
                        :
                            <button
                                onClick={()=>changeLikeStatus(item.id, item.liked_by_user)}
                                className="photo_like-button">
                                <i className="fas fa-heart"></i>{item.likes}{" "}
                            </button>
                        }
                    </div>
                </div>
            )
          });
    }

    return (
          <div className="list_photos">
            <Masonry className='masonry' >
                {listPhotos}
            </Masonry>
          </div>
    );
}

export default ItemPhoto;
