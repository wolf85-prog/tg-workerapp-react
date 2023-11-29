import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import './ProcessPage.css';
import {useTelegram} from "../../hooks/useTelegram";

import qrCode from "../../image/qr.jpeg";

import SharePage from '../../components/SharePage/SharePage';

const ProcessPage = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            
            <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>                  
                <img src={qrCode} alt='' style={{width: '80%'}} />    
                <div style={{marginTop: '50px'}}>
                    <SharePage
                        url="https://mywebsite.com/article-slug"
                        title="Article Title"
                        message="Check this article"
                    /> 
                </div>
                             
            </div>         
        </div>
    );
};


export default ProcessPage;