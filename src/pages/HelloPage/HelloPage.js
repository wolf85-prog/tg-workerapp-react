import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import './HelloPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";
import Loader from "../../components/UI/Loader/Loader";
import { getWorkerId } from '../../http/chatAPI';
import Header from '../../components/Header/Header';
import { useUsersContext } from "../../contexts/UserContext"

//import FonTest from "../../image/back1.jpg";
//import FonTest from "../../image/back2.jpg";

import FonTest01 from "../../image/background/Background 1.0 _ 320 х 568.png";
import FonTest1 from "../../image/background/Background 2.0 _ 320 х 568.png";


const HelloPage = () => {

    const {user} = useTelegram();
    const navigate = useNavigate();

    const [fio, setFio] = useState("")
    const { setSpecId } = useUsersContext();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId('805436270') //'805436270' '1408579113' user?.id

            if (worker.length > 0) {
                console.log("Вы уже зарегистрированы!", user?.id)

                setFio(`Добро пожаловать на борт, \n ${worker[0]?.fio.split(' ')[1]} ${worker[0]?.fio.split(' ')[2]}!`)
 
                setSpecId(worker[0]?.id)

                setTimeout(() => navigate("/menu"), 5000)

            } else {
                console.log("Зарегистрируйтесь!", user?.id)
                //navigate("/add-worker")
            }
        }

        fetchData()   
    });


    return (
        <div className="App">
            <Header header={{title: '', icon: 'false'}}/>

            {/* <img src={Fon} alt='' className='fon-style'/> */}

            <img src={FonTest01} alt='' className='fon-style0' />
            <img src={FonTest1} alt='' className='fon-style0' />
            
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