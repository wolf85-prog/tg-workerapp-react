import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './ProfilePage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";

import { getWorkerId } from '../../http/chatAPI';


const API_URL = process.env.REACT_APP_API_URL

const ProfilePage = () => {

    const {user} = useTelegram();
    const [workerhub, setWorkerhub] = useState([])
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        const fetchData = async() => {
            const worker = await getWorkerId(user?.id)

            console.log("worker: ", worker)

            setWorkerhub(worker)
        }

        fetchData()

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Профиль', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            <form>
                <ol class="bullet">
                    <li><div class="bullet-title">ФИО</div>Иванов Иван Иванович{workerhub[0]?.fio}</li>
                    <li><div class="bullet-title">Город</div>Город{workerhub[0]?.city}</li>
                    <li><div class="bullet-title">Рейтинг</div>Рейтинг</li>
                    <li><div class="bullet-title">Подкатегории</div>Подкатегории</li>
                    <li><div class="bullet-title">Навык</div>Навык</li>
                    <li><div class="bullet-title">Ставка</div>Ставка</li>
                    <li><div class="bullet-title">Ранг</div>Ранг</li>
                    <li><div class="bullet-title">Комтеги</div>Комтеги</li>
                    <li><div class="bullet-title">Мерч</div>Мерч</li>
                </ol>
            </form>
            

            <div className='block-buttons'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                <MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Внести изменения</MyButton>
            </div>
            
        </div>
    );
};


export default ProfilePage;