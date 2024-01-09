import React, { useState } from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

import Menu from "../../image/new/menu.svg";
import MenuFilter from "../../image/new/menuFilter.svg";

const Header = ({filter, setFilter, header}) => {
    // const {user} = useTelegram();

    const [showFilter, setShowFilter] = useState(false)
    const [buttonPress, setButtonPress] = useState(false);

    const onClickFilter = () => {
        showFilter ? setShowFilter(false) : setShowFilter(true)
    } 


    //filter.query
    const onChangeFilter = (query) => {
        showFilter ? setShowFilter(false) : setShowFilter(true)
        setFilter({...filter, query: query})

        setButtonPress(true)
        console.log("Кнопка нажата: ", query)
    } 


    return (
        <div className={'header'}>

            <span className={'title'}>
                {header.title}
            </span>

            <span className={'username'} >
                {header.icon !== 'true' ?
                 <img src = {header.menu} alt="" className='header-icon'/> 
                : <img src = {Menu} alt="" onClick={onClickFilter} style={{display: showFilter ? 'none' : 'block'}}/>}
            </span>


            <div className='menu-filter' style={{display: showFilter ? 'block' : 'none'}}>
                <img src = {MenuFilter} className='menu-icon-filter' alt="" onClick={onClickFilter}/>
                <div className='menu-rec'>
                    <div className='text-filter'> 
                        <p className='item-filter' onClick={()=>onChangeFilter('Все')}>Все</p>
                        <p className='item-filter' onClick={()=>onChangeFilter('Новые')}>Новые</p>
                        <p className='item-filter' onClick={()=>onChangeFilter('Старые')}>Старые</p>
                    </div>  
                </div>     
            </div>
        </div>
    );
};

export default Header;