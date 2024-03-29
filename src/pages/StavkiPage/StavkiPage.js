import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { useUsersContext } from "../../contexts/UserContext";
import Header from "../../components/Header/Header";
import './StavkiPage.css';

import TreugolDown from "../../image/buttons/treug_down.png";
import TreugolUp from "../../image/buttons/treug_up.png";
import { getWorkerId } from '../../http/chatAPI';
import specData from "../../data/specData"

import Sound from "../../image/layers/icons/SOUND.png";
import Riggers from "../../image/layers/icons/RIGGERS.png";
import Production from "../../image/layers/icons/PRODUCTION.png"
import StageGround from "../../image/layers/icons/STAGEGROUND.png";
import Video from "../../image/layers/icons/VIDEO.png";
import Light from "../../image/layers/icons/LIGHT.png";
import Stagehands from "../../image/layers/icons/STAGEHANDS.png";
import Trucks from "../../image/layers/icons/TRUCKS.png";
import Catering from "../../image/layers/icons/CATERING.png";
import Photo from "../../image/layers/icons/PHOTO.png";
import Party from "../../image/layers/icons/PARTY.png";


import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import ButtonStavka from "../../image/buttons/button_stavka.png"
import ButtonStavka2 from "../../image/buttons/button_stavka2.png"

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/logo_04_light.png"

const StavkiPage = () => {
    const [showTable, setShowTable] = useState([false, false, false, false, false])
    const { workerhub: worker } = useUsersContext();
    const [specs, setSpecs] = useState([])

    let arraySpec = []

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  
    }, []);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => {
            //const worker = await getWorkerId('1408579113') //user?.id '1408579113'

            //setWorkerhub(worker)

            worker[0]?.spec.map((work)=>{
                specData.map((item)=> {
                    item.models.map((model)=> {
                        if (model.name === work.name) {
                            let image
                            if (item.icon === 'Sound') {
                                image = Sound;
                            } else if (item.icon === 'Riggers') {
                                image = Riggers;
                            } else if (item.icon === 'Production') {
                                image = Production;
                            } else if (item.icon === 'Stage Ground') {
                                image = StageGround;
                            } else if (item.icon === 'Video') {
                                image = Video;
                            } else if (item.icon === 'Light') {
                                image = Light;
                            } else if (item.icon === 'Stagehands') {
                                image = Stagehands;
                            } else if (item.icon === 'Trucks') {
                                image = Trucks;
                            } else if (item.icon === 'Catering') {
                                image = Catering;
                            } else if (item.icon === 'Photo') {
                                image = Photo;
                            } else if (item.icon === 'Party') {
                                image = Party;
                            }

                            const newObj = {
                                icon: image,
                                name: work.name
                            }
                            arraySpec.push(newObj)
                        }
                    })
                })    
            })

            console.log(arraySpec)
            setSpecs(arraySpec);
            
        }

        fetchData()
    }, []);


    const handleClick = (ind) => {
        console.log(ind, showTable)

        setShowTable(prevShownTable => ({
            ...prevShownTable,
            [ind]: !prevShownTable[ind]
          }));

    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя ставка', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div className='form-stavka'>
                <div style={{marginTop: '50px', textAlign: 'left'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            fontSize: '24px',
                            color: '#fff',
                        }}> Моя специальность:
                    </p> 
                    
                    {specs.map((worker, index) => index < 5 ? 
                        //worker.name 
                        <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div className="button-stavki" style={{ 
                                                            backgroundImage: `url(${showTable[index] ? ButtonStavka2 : ButtonStavka})`,
                                                            display: 'flex',
                                                            margin: '0 20px 10px 20px', 
                                                            justifyContent: 'space-between', 
                                                            alignItems: 'center',
                                                            padding: '10px 22px 10px 15px',
                                                            zIndex: '6'}} 
                                    onClick={()=>handleClick(index)}>
                                        <img src={worker.icon} alt='' width={45}/>
                                        {worker.name} 
                                        {showTable[index] ? <img src={TreugolUp} alt='' width={25} style={{position: 'relative', zIndex: '2'}}/>
                                        : <img src={TreugolDown} alt='' width={25} style={{position: 'relative', zIndex: '2'}}/>}
                            </div>
                            
                            {showTable[index] ? 
                            // <img className='table-image' src={Table1} alt='' width='95%'/> 
                            <div style={{marginBottom:'20px', marginTop: '-48px', width: '320px'}}> 
                            {/* <div style={{marginBottom:'20px', marginTop: '-48px', width: '77%'}}>  */}
                                <table className="table-spec" id="table">
                                    <tbody>
                                        <tr>
                                            <td className='title-gray' style={{verticalAlign: 'bottom', height: '60px'}}>Моя ставка</td>
                                            <td style={{verticalAlign: 'bottom'}}>400.00</td>
                                            <td style={{verticalAlign: 'bottom'}}>руб./час</td>
                                        </tr>
                                    {/* </thead> */}
                                    {/* <tbody> */}
                                            <tr>
                                                <td style={{height: '25px'}} colspan="3"></td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Условия</td>
                                                <td className='title-gray'>Минималка</td>
                                                <td className='title-gray'>Ставка</td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Ночные проекты</td>
                                                <td>4 часа</td>
                                                <td>2 400.00</td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Москва</td>
                                                <td>6 часов</td>
                                                <td>2 400.00</td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Московская область</td>
                                                <td>8 часов</td>
                                                <td>2 400.00</td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Проекты на улице</td>
                                                <td>4 часа</td>
                                                <td>2 400.00</td>
                                            </tr>
                                            <tr>
                                                <td style={{height: '25px'}} colspan="3"></td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Переработки</td>
                                                <td>10%</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Смена до 10 часов</td>
                                                <td>400</td>
                                                <td>руб./час</td>
                                            </tr>
                                            <tr>
                                                <td className='title-gray'>Смена до 10 часов</td>
                                                <td>600</td>
                                                <td>руб./час</td>
                                            </tr>

                                    </tbody>
                                </table>
                            </div>
                            : null}
                        </div>
                        : null 
                    )}
                    
                      
                </div> 
            </div> 

            <div className='footer-block' >
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>        
        </div>
    );
};


export default StavkiPage;