import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useResize } from './../../hooks/useResize';
import './HelloPage.css';
import Loader from "../../components/UI/Loader/Loader";
import { getWorkerId } from '../../http/chatAPI';
import Header from '../../components/Header/Header';
import { useUsersContext } from "../../contexts/UserContext"

//import FonTest from "../../image/back1.jpg";
//import FonTest from "../../image/back2.jpg";

// import FonTest01 from "../../image/background/Background 1.0 _ 320 х 568.png";
// import FonTest02 from "../../image/background/Background 1.0 _ 375 х 598.png";
// import FonTest03 from "../../image/background/Background 1.0 _ 414 х 658.png";

// import FonTest11 from "../../image/background/Background 2.0 _ 320 х 568.png";
// import FonTest12 from "../../image/background/Background 2.0 _ 375 х 598.png";
// import FonTest13 from "../../image/background/Background 2.0 _ 414 х 658.png";

import Fon from "../../image/layers/ULEY_triangle.png";
import FonGradTop from "../../image/layers/upper_red.png";
import FonGradBottom from "../../image/layers/lower_blue.png";

const HelloPage = () => {

    const {user} = useTelegram();
    const navigate = useNavigate();
    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();

    const [fio, setFio] = useState("")
    const { setSpecId } = useUsersContext();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id

            if (worker.length > 0) {
                console.log("Вы уже зарегистрированы!", user?.id)

                setFio(`Добро пожаловать на борт, \n ${worker[0]?.fio.split(' ')[1]} ${worker[0]?.fio.split(' ')[2]}!`)
 
                setSpecId(worker[0]?.id)

                setTimeout(() => navigate("/menu"), 5000)

            } else {
                console.log("Зарегистрируйтесь!", user?.id)
                navigate("/add-worker")
            }
        }

        fetchData()   
    });


    return (
        <div className="App">
            <Header header={{title: '', icon: 'false'}}/>

            {/* темный фон */}
            {/* <img src={isScreenLg ? FonTest03 : (isScreenMd ? FonTest02 : FonTest01)} alt='' style={{width:"100%", position: 'absolute', left: '0'}} /> */}
            
            {/* фон с градиентом */}
            {/* <img src={isScreenLg ? FonTest13 : (isScreenMd ? FonTest12 : FonTest11)} alt='' className='fon-style0' /> */}


            <img src={Fon} alt='' className='fon-style' />

            <img src={FonGradTop} alt='' className='fon-style2' />
            <img src={FonGradBottom} alt='' className='fon-style21' />
            
            <form>
                <div style={{marginTop: '330px'}}>  
                    {!fio
                        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                        : <p className='welcomStyle'> {fio}
                        </p>  
                    }                
                           
                </div>       
            </form>
        </div>
    );
};

export default HelloPage;