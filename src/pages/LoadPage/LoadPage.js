import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useResize } from './../../hooks/useResize';
import { useTelegram } from "../../hooks/useTelegram";
import './LoadPage.css';
import { useUsersContext } from "../../contexts/UserContext"
import { getWorkerId } from '../../http/chatAPI';

import logo_small from '../../image/logo.gif'
import logo_mid from '../../image/logo_Iphone5.gif'
import logo_big from '../../image/logo_Iphone6.gif'


const LoadPage = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();

    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);

    const { workerhub: worker, flag, setSpecId } = useUsersContext();
    const [workerId, setWorkerId] = useState('')

    const { width, isScreenSm, isScreenMd, isScreenLg } = useResize();

    //const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        //setTimeout(() =>  navigate("/hello"), 7000)
       // setTimeout(() =>  navigate("/profile"), 7000)

       const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id '6143011220'
            //console.log("worker: ", worker.length) 
            //console.log(worker[0]?.id)
            setWorkerId(worker[0]?.id)
            setSpecId(worker[0]?.id)
            
            setTimeout(()=> {      
                if (worker.length > 0) {
                    //зарегистрирован
                    console.log("Зарегистирован", "REG")
                    //setSpecId(worker[0]?.id)
                    navigate("/profile")
                } else  {
                    if (flag === 'ONLY_REG') {
                        //только что зарегистрирован
                        console.log("Только что зарегистировался", flag)
                        navigate("/process")
                    } 
                    else if (flag === 'NOREG') {
                        //не зарегистрирован
                        console.log("Зарегистрируйтесь! NOREG")
                        //navigate("/add-worker")
                        navigate("/error")
                    }
                }
            }, 5000)
        }

        fetchData()  
    }, []);

    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#212527') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])


    return (
        <div className="App" style={{display: 'flex', height: '100vh'}}>
            {/* {isScreenLg && (<img src={logo_big} alt="loading..." width='100%' />)} */}
            <img src={logo_mid} alt="loading..." width='100%' />
            {/* {isScreenSm && (<img src={logo_small} alt="loading..." width='100%' />)} */}
        </div>
    );
};

export default LoadPage;