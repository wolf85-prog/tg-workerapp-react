import React, { useEffect } from 'react';

import Header from "../../components/Header/Header";
import './FaqPage.css';


const API_URL = process.env.REACT_APP_API_URL

const FaqPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'FAQ', icon: 'false'}}/>

            {/* <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>  */}
            
            {/* <form>
                <div style={{marginTop: '250px'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '26px',
                            color: '#fff',
                        }}> Страница в разработке!
                    </p>         
                </div> 
                <div className='block-buttons-contact'>
                    <Link to={'/menu'}><MyButton style={{marginTop: '100px', width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                </div>
            </form>          */}
        </div>
    );
};


export default FaqPage;