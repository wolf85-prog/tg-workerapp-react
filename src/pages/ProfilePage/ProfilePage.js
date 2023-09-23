import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './ProfilePage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import iconStar from "../../image/star2.png";

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
            <Header header={{title: 'Мой профиль', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            <form>
                <ol class="bullet">
                    <li><div class="bullet-title">Фамилия</div>{workerhub[0]?.fio.split(' ')[0]}</li>
                    <li><div class="bullet-title">Имя</div>{workerhub[0]?.fio.split(' ')[1]}</li>
                    <li><div class="bullet-title">Отчество</div>{workerhub[0]?.fio.split(' ')[2]}</li>
                    <li><div class="bullet-title">Город</div>{workerhub[0]?.city}</li>
                    {/* <li><div class="bullet-title">Рейтинг</div>{workerhub[0]?.reyting}</li> */}
                    <li><div class="bullet-title">Рейтинг</div>
                        &#9733;&#9733;&#9733;&#9733;&#9733;  
                    </li>
                    <li><div class="bullet-title">Специальность</div>{workerhub[0]?.spec[0].name}</li>
                    <li><div class="bullet-title">Компетенции</div></li>
                    {/* <li><div class="bullet-title">Ставка</div>Ставка</li> */}
                    <li><div class="bullet-title">Проекты с U.L.E.Y</div>{workerhub[0]?.rank}</li>
                    <li><div class="bullet-title">Замечания</div>{workerhub[0]?.comteg}</li>
                    <li><div class="bullet-title">Мерч</div>{workerhub[0]?.merch}</li>
                </ol>
            </form>
            

            <div className='block-buttons'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>Внести изменения</MyButton>
            </div>
            
        </div>
    );
};


export default ProfilePage;