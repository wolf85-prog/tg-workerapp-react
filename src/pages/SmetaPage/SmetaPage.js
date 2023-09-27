import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './SmetaPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


const SmetaPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Смета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <form>
            <table class="unfixed-table">
                    <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Проект</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12.09.2023</td>
                                <td>Название проекта</td>
                            </tr>
                        </tbody>                 
                    </table>       
            </form>

            <div className='block-smeta'>
                <MyButton onClick={handleClick} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton>       
            </div>
        </div>
    );
};


export default SmetaPage;