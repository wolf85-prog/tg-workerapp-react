import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './ProfilePage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import iconCheck from "../../image/check.png";
import iconUnCheck from "../../image/uncheck.png";
import Loader from "../../components/UI/Loader/Loader";

import { getWorkerId } from '../../http/chatAPI';


//const API_URL = process.env.REACT_APP_API_URL

const ProfilePage = () => {

    const {user} = useTelegram();
    const [workerhub, setWorkerhub] = useState([])
    const [spec, setSpec] = useState("")
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

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мой профиль', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            {/* {workerhub.length > 0
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div> 
            :*/}
            <div className='form-profile'>
                <ol className="bullet">
                    <li><div className="bullet-title">ФИО</div>{workerhub[0]?.fio.split(' ')[0]}</li>
                    <li><div className="bullet-title"></div>{workerhub[0]?.fio.split(' ')[1]} {workerhub[0]?.fio.split(' ')[2]}</li>
                    <li><div className="bullet-title">Город</div>{workerhub[0]?.city}</li>
                    <li><div className="bullet-title">Специальность</div>              
                        <table className="table-noborder">{workerhub[0]?.spec.map((worker, index) => index < 8 ? <tr><td key={worker.id}>{worker.name}</td></tr> : '' )}</table>
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
                <div className='block-buttons-profile'>
                    <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                    <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>Внести изменения</MyButton>
                </div>
            </div>
            {/* } */}
            
        </div>
    );
};


export default ProfilePage;