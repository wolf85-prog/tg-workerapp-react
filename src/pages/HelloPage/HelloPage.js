import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import './HelloPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import Logo from "../../image/logo_04_light.png";
import Logo2 from "../../image/workhub.png";

import { getWorkerId } from '../../http/chatAPI';


const HelloPage = () => {

    const {user} = useTelegram();
    const navigate = useNavigate();

    const [showNext, setShowNext] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);
    const [workerhub, setWorkerhub] = useState("")
    const [fio, setFio] = useState("")
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => {
            const worker = await getWorkerId(user?.id.toString())
            if (worker.length > 0) {
                console.log("Вы уже зарегистрированы!", user?.id)
            } else {
                console.log("Зарегистрируйтесь!", user?.id)
            }

            console.log("worker: ", worker[0]?.fio)

            setWorkerhub(worker[0]?.fio)

            setFio(`Добро пожаловать, ${workerhub.split(' ')[1]} ${workerhub.split(' ')[2]}! Вы в команде!`)
        }

        fetchData()

        //setTimeout(() =>  navigate("/add-worker"), 3000)
    }, []);


    return (
        <div className="App">

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
            
            <form>
                <div style={{marginTop: '250px'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            fontSize: '26px',
                            color: '#2975f5',
                        }}> {fio}
                    </p>         
                </div>       
            </form>
        </div>
    );
};

export default HelloPage;