import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './StavkiPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";
import MyButton from "../../components/UI/MyButton/MyButton";
import TreugolDown from "../../image/treugol.png";
import TreugolUp from "../../image/treugol2.png";
import Table1 from "../../image/tab_helper.png";

const StavkiPage = () => {
    const [showTable, setShowTable] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        showTable ? setShowTable(false) : setShowTable(true)
    }

    const handleClick2 = (e) => {
        e.preventDefault();
        showTable ? setShowTable(false) : setShowTable(true)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя ставка', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <form>
                <div style={{marginTop: '100px', textAlign: 'left', paddingLeft: '15px',}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            fontSize: '24px',
                            color: '#fff',
                        }}> Моя специальность:
                    </p> 
                    <MyButton onClick={handleClick} style={{width: "250px", 
                                background: '#3f4052', 
                                border: '1px solid #3f4052',
                                display: 'flex', 
                                justifyContent: 'space-around', 
                                alignItems: 'center'}}>
                        Помощник / Грузчик {showTable ? <img src={TreugolUp} alt='' width={25} style={{position: 'relative', zIndex: '2'}}/>
                                                    : <img src={TreugolDown} alt='' width={25} style={{position: 'relative', zIndex: '2'}}/>}
                    </MyButton> 
                    {showTable ? <img src={Table1} alt='' width='95%' /> : '' }   
                </div> 
                <div className='block-buttons-stavki'>
                    <Link to={'/menu'}><MyButton style={{marginTop: '100px', width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                </div>
            </form>         
        </div>
    );
};


export default StavkiPage;