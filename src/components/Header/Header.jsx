import React, { useState } from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

import Menu from "../../image/new/menu.svg";
import MenuFilter from "../../image/new/menuFilter.svg";

const Header = (props) => {
    // const {user} = useTelegram();

    const [showFilter, setShowFilter] = useState(false)

    const onClickFilter = () => {
        showFilter ? setShowFilter(false) : setShowFilter(true)
    } 


    return (
        <div className={'header'}>

            <span className={'title'}>
                {props.header.title}
            </span>

            <span className={'username'} onClick={onClickFilter} style={{display: showFilter ? 'none' : 'block'}}>
                {props.header.icon !== 'true' ? <img src = {props.header.menu} alt="" className='header-icon'/> : <img src = {Menu} alt=""/>}
            </span>

            {/* <span className={'username'}>
                {props.header.icon !== 'false' ? <img src = {Menu} alt=""/> : props.header.menu}
            </span> */}

            <div className='menu-filter' style={{display: showFilter ? 'block' : 'none'}}>
                <img src = {MenuFilter} className='menu-icon-filter' alt="" onClick={onClickFilter}/>
                <div className='menu-rec'>
                    <div className='text-filter'> 
                        <p className='item-filter'>Все</p>
                        <p className='item-filter'>Новые</p>
                        <p className='item-filter'>Старые</p>
                    </div>  
                </div>     
            </div>
        </div>
    );
};

export default Header;