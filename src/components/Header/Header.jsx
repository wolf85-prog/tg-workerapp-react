import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

import Menu from "../../image/new/menu.svg";

const Header = (props) => {
    const {user} = useTelegram();
    return (
        <div className={'header'}>

            <span className={'title'}>
                {props.header.title}
            </span>

            <span className={'username'}>
                {props.header.icon !== 'false' ? <img src = {Menu} alt="briefcase"/> : props.header.menu}
            </span>
        </div>
    );
};

export default Header;