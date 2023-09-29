import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import './HelloPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";

import { getWorkerId } from '../../http/chatAPI';
import Header from '../../components/Header/Header';


const HelloPage = () => {

    const {user} = useTelegram();
    const navigate = useNavigate();

    const [fio, setFio] = useState("")
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => {
            const worker = await getWorkerId('6143011220') //'805436270' user?.id
            if (worker.length > 0) {
                console.log("Вы уже зарегистрированы!", user?.id)

                setFio(`Добро пожаловать на борт, \n ${worker[0]?.fio.split(' ')[1]} ${worker[0]?.fio.split(' ')[2]}!`)

                setTimeout(() => navigate("/menu", {
                    state: {
                      spec: worker[0]?.id,
                    }}), 4000)
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

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
            
            <form>
                <div style={{marginTop: '330px'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            fontSize: '26px',
                            color: '#ffffff',
                        }}> {fio}
                    </p>         
                </div>       
            </form>
        </div>
    );
};

export default HelloPage;