import React from 'react'
import { Link } from "react-router-dom";


import Menu from '../menu/Menu'
import Search from '../search/Search';

import './Header.css'

import logo from '../../img/logo.png'

const Header = (props) => {

    const {
        loadProfileUser,
        loadSearchPhotos,
        goLogIn, 
        goLogOut, 
        profileFromApp,
        setAccessToken,
        searchQwery,
        handlerInputsValue,
        handlerClickSearch,
         } = props;
    
    let logInLogOut = null;
    let profile = null;
    
    if (sessionStorage.getItem('token') === 'undefined' || // если не сохранена сессия
        sessionStorage.getItem('token') === ''||  // или пустая
        !sessionStorage.getItem('token')){
        setAccessToken();
        logInLogOut = (
            <li onClick={()=>
            goLogIn()
            }>
                <Link to="/">
                    <button className="comeIn">
                        Войти
                    </button>
                </Link>                  
            </li>
        );

    } else {
        logInLogOut = (
            <li onClick={()=>goLogOut()}>
                <Link to="/">
                    <button className="logOff">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </Link>
            </li>
        );
        if(Object.keys(profileFromApp).length === 0){
            profile = (
                <div className="foto">			
                    загрузка
                    {loadProfileUser()}								
                </div>
            );            
        }else if(Object.keys(profileFromApp).length !== 0){
            profile = (
                <div className="foto">			
                    <img src={profileFromApp.profile_image.large} alt="avatar"/>
                    <div className="theme3">{' '}{profileFromApp.name}</div>								
                </div>
            )
        } else {
            profile = (
                <div className="foto">			
                    <img src={profileFromApp.profile_image.large} alt="avatar"/>        
                    <div className="theme3">{' '}{profileFromApp.name}</div>								
                </div>
            )
        }
    }

    return (        
        <header className="header">
            <div className="header__fixed-container">
                <div className="header__flex-container">
                    <a className="logotip" href="/">
                        <img src={logo} alt="logo" title="" className="logo" />
                        <div className="logo-name">
                            <h1 className="pinball">Moment in life</h1>
                            <h2 className="theme">Photo gallery</h2>
                        </div>
                    </a>
                    <Menu />
                    <Search
                        loadSearchPhotos={loadSearchPhotos}
                        handlerClickSearch={handlerClickSearch}
                        searchQwery={searchQwery}
                        handlerInputsValue={handlerInputsValue}
                    />                   
                    {profile}
                    {logInLogOut}                 
                </div>
            </div>		
        </header>
    )    
}

export default Header;

