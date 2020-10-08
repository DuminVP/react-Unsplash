import React from 'react';

import 'bootswatch/dist/darkly/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { 
    BrowserRouter as Router, 
    Route,
    Switch,
    Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import { // сделано
    likePhoto, 
    disLikePhoto, 
    getlistPhoto, 
    getPhotoDetails, 
    getSearchPhotos, 
    getProfileCurrentUser, 
    authenticationUrl, 
    setAccessTokenUnplash } from "../utils/unsplash-service";

import { // сделано
    loadPhotoAction,
    loadProfileAction,
    loadPhotoDetailsAction,
    loadSearchPhotosAction,
    logOutAction,
    logInAction, 
    likePhotoAction, 
    disLikePhotoAction, 
    handlerInputsValueAction,
    handlerClickSearchAction } from '../actions/PageActions';

import Header from '../components/header/Header';
import Main from '../components/main/Main';
import SearchResult from '../components/searchResult/SearchResult';
import PhotoDetails from '../components/photoDetails/PhotoDetails';

import './fonts.css';
import './App.css';


class App extends React.Component {

    loadPhotos = () => { // загрузить фото
        const { loadPhotosToApp, storeToApp } = this.props;

        const page = storeToApp.photos.length;
        const per_page = storeToApp.stepLoad;

        const data = getlistPhoto(page, per_page);

        loadPhotosToApp(data);       
    } 

    componentDidMount = () => {
        if(!sessionStorage.getItem('token')) this.loadPhotos();
    }

    render(){

        const {
            storeToApp,
            likePhotoToApp, 
            disLikePhotoToApp, 
            loadProfileToApp,
            loadPhotoDetailsToApp,
            logOutToApp, 
            logInToApp, 
            selectValueSortToApp,
            handlerInputsValueToApp,
            handlerClickSearchToApp,
            loadSearchPhotosToApp } = this.props;

        let {
            profileUser,
            photoDetails,
            stepLoad,
            searchResult,
            searchQwery,
            error } = storeToApp;

        // обработка авторизации
        const setAccessToken = async () => {
            const code = window.location.search.split('code=')[1];
            if (code) {
                sessionStorage.setItem('token', code);
                sessionStorage.setItem('token', await setAccessTokenUnplash(code));
                logInToApp();
            }
        };

        // обработка авторизации
        const goLogIn = () => {
            window.location.assign(authenticationUrl);
            //logInToApp();
        };

        // обработка выхода из профиля
        const goLogOut = () => {
            sessionStorage.clear('token');
            logOutToApp();
        };

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

        // загрузка фото по поисковому запросу
        const loadSearchPhotos = (qwery)=>{

            const page = searchResult.searchPhotos.length;
            const per_page = stepLoad;

            const data = getSearchPhotos(qwery, page, per_page);
            loadSearchPhotosToApp(data, qwery);
        };

        // извлекаем профиль текущего пользователя
        const loadProfileUser = () => {
            const data = getProfileCurrentUser();
            loadProfileToApp(data);
        };

        // обработчик загрузки деталей фотографии
        const loadPhotoDetails = (idPhoto) => {
            const data = getPhotoDetails(idPhoto);
            loadPhotoDetailsToApp(data);
        };


        console.log(error);
        console.log(storeToApp);

        return (
            <Router>
                <Header
                    setAccessToken={setAccessToken}
                    profileFromApp={profileUser}
                    searchQwery={searchQwery}
                    goLogIn={goLogIn}
                    goLogOut={goLogOut}
                    loadProfileUser={loadProfileUser}
                    selectValueSort={selectValueSortToApp}
                    handlerInputsValue={handlerInputsValueToApp} 
                    handlerClickSearch={handlerClickSearchToApp}
                    loadSearchPhotos={loadSearchPhotos}
                    loadPhotoFromApp={this.loadPhotos}                           
                />
                <Switch>
                    <Route 
                        path="/search-result/"
                        render={()=>(
                            <SearchResult
                                storeFromApp={storeToApp}
                                loadSearchPhotos={loadSearchPhotos} 
                                handlerClickSearch={handlerClickSearchToApp}
                                loadPhotoDetails={loadPhotoDetails}
                                getDateCreated={getDateCreated}
                                changeLikeStatus={changeLikeStatus}
                            />
                        )}
                    />
                    <Route exact
                        path="/photo/:id" 
                        render={()=>(
                            <PhotoDetails
                                photoDetails={photoDetails}
                                getDateCreated={getDateCreated} 
                                changeLikeStatus={changeLikeStatus}
                            />
                        )}
                    />
                    <Route
                        path="/"
                        render={() => (
                            <Main 
                                storeFromApp={storeToApp}
                                loadPhotoFromApp={this.loadPhotos}
                                loadPhotoDetails={loadPhotoDetails}
                                getDateCreated={getDateCreated}
                                changeLikeStatus={changeLikeStatus}
                            />
                        )}
                    />                    
                    <Redirect to='/' />
                </Switch>
            </Router>
        );
    }
};

const mapStateToProps = (state) => {
    return ({ storeToApp: state })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        loadPhotosToApp: (data) => {dispatch(loadPhotoAction(data))},

        likePhotoToApp: (idx, status) => {dispatch(likePhotoAction(idx, status))},

        disLikePhotoToApp: (idx, status) => {dispatch(disLikePhotoAction(idx, status))},

        loadProfileToApp: (data) => dispatch(loadProfileAction(data)),

        loadPhotoDetailsToApp: (data) => dispatch(loadPhotoDetailsAction(data)),

        loadSearchPhotosToApp: (data, qwery) => dispatch(loadSearchPhotosAction(data, qwery)),

        logOutToApp: () => dispatch(logOutAction()),

        logInToApp: () => dispatch(logInAction()),

        handlerInputsValueToApp: (value, id) => dispatch(handlerInputsValueAction(value, id)),

        handlerClickSearchToApp: () => dispatch(handlerClickSearchAction())
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
