import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = (props) => {
    const {user} = useTelegram();
    return (
        <div className={'header'}>

            {/* {props.header.icon !== 'false'
            ? <img src = {briefcase} alt="briefcase"/> : ""
            } */}


            <span className={'title'}>
                {props.header.title}
            </span>

            <span className={'username'}>
                ID {user?.id}
                {/* ID 805436270 */}
            </span>
            {/* <img className={'btn-close'} onClick={onClose} src={CloseButton}/> */}
        </div>
    );
};

export default Header;