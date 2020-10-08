import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import {
    likePhoto, 
    disLikePhoto } from "../../utils/unsplash-service";

import { 
    likePhotoAction, 
    disLikePhotoAction } from '../../actions/PageActions';

import './PhotoDetails.css';

class PhotoDetail extends React.Component {
/*
    constructor(props) {
        super(props);
        console.log("constructor  1");
        console.log(this.props.photoDetails.liked_by_user)
    }
*/
/*
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps()  2-которая вызывается при обновлении объекта props");
    }
    
    componentWillMount(){
        console.log("componentWillMount() 3-вызывается непосредственно перед рендерингом компонента");
    }

    componentDidMount(){
        console.log("componentDidMount() 4-вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам");
    }
    componentWillUnmount(){
        console.log("componentWillUnmount() 5-вызывается перед удалением компонента из DOM");
    }
*/
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate() 6-вызывается каждый раз при обновлении объекта props или state");
        return true;
    }
/*    
    componentWillUpdate(){
        console.log("componentWillUpdate() 7-вызывается перед обновлением компонента");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate() 8-вызывается сразу после обновления компонента");
    }
*/

    render() {
        console.log("render()");

        const {
            storeToApp,
            likePhotoToApp, 
            disLikePhotoToApp, 
        } = this.props;

        let {
            photoDetails,
            error } = storeToApp;

        // получение даты создания
        const getDateCreated = (string) => {
            const arrD = string.split('T');
            const arrT = arrD[1].split('-');
            const result = arrD[0]+", "+arrT[0];
            return result;
        };

        // обработка лайков/дизлайков
        const changeLikeStatus = (id, status) => {
            //console.log(id, status);
            if (sessionStorage.getItem('token') === 'undefined' || 
                sessionStorage.getItem('token') === '' || 
                !sessionStorage.getItem('token')){

                alert('Чтобы поставить лайк войдите в свой профиль'); // 
            } else {
                if (status === false) {
                    likePhoto(id, sessionStorage.getItem('token'));
                    likePhotoToApp(id, status);
                } else  {
                    disLikePhoto(id, sessionStorage.getItem('token'));
                    disLikePhotoToApp(id, status);
                }
            }  
        };

        console.log(error);
        console.log(storeToApp);


        let details = null;

        if (Object.keys(photoDetails).length !== 0) {

            //console.log(photoDetails)

            details =
                <div className="photo1" >
                    <Link to={`/`}>
                        <button className="photoOff">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </Link>
                    <div className="photo-details">
                        <div className="photo_profile">
                            <img src={photoDetails.user.profile_image.small} alt="avatar" className="avatar2"/>
                            <span className="photo_profile-link">
                                <a href={photoDetails.user.links.html}>{photoDetails.user.first_name}</a>
                            </span>
                        </div>
                        <div className="photo_like2">
                        {
                        photoDetails.liked_by_user ?
                            <button
                                onClick={()=>changeLikeStatus(photoDetails.id, photoDetails.liked_by_user)}
                                className="photo_like-button2 like">
                                <i className="fas fa-heart"></i>{photoDetails.likes}{" "}
                            </button>
                        :
                            <button
                                onClick={()=>changeLikeStatus(photoDetails.id, photoDetails.liked_by_user)}
                                className="photo_like-button2">
                                <i className="fas fa-heart"></i>{photoDetails.likes}{" "}
                            </button>
                        }
                        </div>
                        <div className="photo_date2">
                            <span>
                                {getDateCreated(photoDetails.created_at)}
                            </span>
                        </div>

                    </div>
                    <div className="photo2">
                        <img src={photoDetails.urls.small} alt="photography" />
                    </div>                    
                </div>

            console.log("отрисовка")
        } else if (Object.keys(photoDetails).length === 0) {
            details =
                <div className="photo1" >
                    Нужно обновиться...
                </div>
        }

        return (
            <main className="main">
                <section className="skils-section">
                    <div className="skils-section__fixed-container">
                        <div  className="container">
                            <div className="row">
                                <div className="col">
                                    {details}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return ({ storeToApp: state })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        likePhotoToApp: (idx, status) => {dispatch(likePhotoAction(idx, status))},

        disLikePhotoToApp: (idx, status) => {dispatch(disLikePhotoAction(idx, status))},
    })
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoDetail);

