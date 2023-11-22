import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useResize } from './../../hooks/useResize';
import './HelloPage.css';
import Loader from "../../components/UI/Loader/Loader";
import { getWorkerId } from '../../http/chatAPI';
import Header from '../../components/Header/Header';
import { useUsersContext } from "../../contexts/UserContext"


import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red2.png";
import FonGradBottom from "../../image/layers/lower_blue.png";

const HelloPage = () => {

    const {user} = useTelegram();
    const navigate = useNavigate();
    const { workerhub: worker } = useUsersContext();
    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [showLogo3, setShowLogo3] = useState(false);

    const [fio, setFio] = useState("")
    const { setSpecId } = useUsersContext();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            //const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id '6143011220'

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

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 1000) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 1000) // градиент низ
        setTimeout(() =>  setShowLogo3(true), 1000)
    })


    return (
        <div className="App" >
            <Header header={{title: '', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            {/* <img src={Fon} alt='' className='fon-style-full' /> */}

            {/* треугольники */}
            <div style={{display: 'flex', height: '100vh', position: 'absolute', right: '0', opacity: '0.4'}}>
                <img src={Fon} alt='' className='fon-style' style={{visibility: showLogo3 ? "visible": "hidden"}}/>
            </div>
            

            <img src={FonGradTop} alt='' className='fon-style2' style={{visibility: showGrad ? "visible": "hidden"}} />
            <img src={FonGradBottom} alt='' className='fon-style21' style={{visibility: showGrad2 ? "visible": "hidden"}} />
            
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