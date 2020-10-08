import React from 'react';

import './Menu.css'
import menu2 from '../../img/menu2.png'

const Menu = () => {

	return (
        <div className="dropdown">
            <button className="menu2">
                <img src={menu2} alt="" title="" className="menu3" /> 
            </button>
            <div className="dropdown-content">
                <a href="https://unsplash.com/">Unsplash</a>
                <a href="http://duminslav.ru/">Портфолио</a>
            </div>
        </div>
	)
}

export default Menu;