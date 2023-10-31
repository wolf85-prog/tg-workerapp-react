import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './ProfilePage.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/layers/ULEY_triangle.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import iconCheck from "../../image/check.png";
import iconUnCheck from "../../image/uncheck.png";
//import Loader from "../../components/UI/Loader/Loader";

import { getWorkerId } from '../../http/chatAPI';

import btnMenu from "../../image/layers/icon_menu.png";
import btnChange from "../../image/buttons/button_for_menu2.png"
import smallMenu from "../../image/layers/ULEY text.png"


//const API_URL = process.env.REACT_APP_API_URL

const ProfilePage = () => {

    const {user} = useTelegram();
    const [workerhub, setWorkerhub] = useState([])
    //const [spec, setSpec] = useState("")

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        const fetchData = async() => {
            const worker = await getWorkerId(user?.id) //user?.id

            console.log("worker: ", worker)

            setWorkerhub(worker)

            //setSpec(worker[0]?.spec.map(worker => worker.name))
        }

        fetchData()

    }, []);

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мой профиль', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'absolute', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>


            <div className='form-profile'>
                <ol className="bullet">
                    <li><div className="bullet-title">ФИО</div>{workerhub[0]?.fio.split(' ')[0]}</li>
                    <li><div className="bullet-title"></div>{workerhub[0]?.fio.split(' ')[1]} {workerhub[0]?.fio.split(' ')[2]}</li>
                    <li><div className="bullet-title">Город</div>{workerhub[0]?.city}</li>
                    <li><div className="bullet-title">Специальность</div>              
                        <table className="table-noborder">{workerhub[0]?.spec.map((worker, index) => index < 8 ? <tr key={worker.id}><td>{worker.name}</td></tr> : '' )}</table>
                    </li>
                    <li><div className="bullet-title">Рейтинг</div>
                        &#9733;&#9733;&#9733;&#9733;&#9733;  
                    </li>                    
                    <li><div className="bullet-title">Проекты с U.L.E.Y</div>{workerhub[0]?.rank}</li>
                    <li><div className="bullet-title">Компетенции</div></li>
                    {/* <li><div className="bullet-title">Замечания</div>{workerhub[0]?.comteg.map(item=>item.name).join(' ')}</li> */}
                    <li><div className="bullet-title">Мерч</div><img src={workerhub[0]?.merch.length > 0 ? iconCheck : iconUnCheck} alt='' width='25px' height='25px'/></li>
                    <li><div className="bullet-title"></div>{workerhub[0]?.merch.map(item=>item.name).join(' | ')}</li>
                </ol>
                <div style={{display: 'flex', justifyContent: 'center', zIndex: '12', position: 'relative'}}>
                    <button class="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Внести изменения</button>
                </div>

                <div className='block-buttons-profile' style={{position: 'absolute', right: '0', top: '650px'}}>
                    <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                    <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
                </div>
            </div>
            {/* } */}

            
            
        </div>
    );
};


export default ProfilePage;