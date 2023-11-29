import React, { useEffect } from 'react';
import './ProcessPage.css';


const ProcessPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            
            <form>
                <div style={{marginTop: '350px'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '26px',
                            color: '#fff',
                        }}> Поделиться ссылкой 
                    </p>         
                </div> 
            </form>         
        </div>
    );
};


export default ProcessPage;