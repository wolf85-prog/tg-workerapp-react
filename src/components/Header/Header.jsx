import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = (props) => {
    const {user, queryId, onClose} = useTelegram();
    return (
        <div className={'header'}>

            {/* {props.header.icon !== 'false'
            ? <img src = {briefcase} alt="briefcase"/> : ""
            } */}


            <span className={'title'}>
                {props.header.title}
            </span>

            <span className={'username'}>
                {/* {user?.id} */}123456789
            </span>
            {/* <img className={'btn-close'} onClick={onClose} src={CloseButton}/> */}
        </div>
    );
};

export default Header;