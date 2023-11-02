import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './StavkiPage.css';

import MyButton from "../../components/UI/MyButton/MyButton";
import TreugolDown from "../../image/treugol.png";
import TreugolUp from "../../image/treugol2.png";
import Table1 from "../../image/tab_helper.png";
import stagehands from "../../image/spec/7_stagehands.svg";
import { getWorkerId } from '../../http/chatAPI';
import specData from "../../data/specData"

import Sound from "../../image/spec/1_sound.svg";
import Riggers from "../../image/spec/2_riggers.svg";
import Production from "../../image/spec/3_production.svg";
import StageGround from "../../image/spec/4_stage_ground.svg";
import Video from "../../image/spec/5_video.svg";
import Light from "../../image/spec/6_light.svg";
import Stagehands from "../../image/spec/7_stagehands.svg";
import Trucks from "../../image/spec/8_trucks.svg";
import Catering from "../../image/spec/9_catering.svg";
import Photo from "../../image/spec/10_photo.svg";
import Party from "../../image/spec/11_party.svg";


import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";


import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

const StavkiPage = () => {
    const [showTable, setShowTable] = useState(false)
    const {user} = useTelegram();
    const [workerhub, setWorkerhub] = useState([])
    const [specs, setSpecs] = useState([])

    let arraySpec = []

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    }, []);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => {
            const worker = await getWorkerId('1408579113') //user?.id '1408579113'

            console.log("worker: ", worker)

            setWorkerhub(worker)

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

    const handleClick = (e) => {
        e.preventDefault();
        showTable ? setShowTable(false) : setShowTable(true)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя ставка', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <form>
                <div style={{marginTop: '100px', textAlign: 'left', paddingLeft: '15px',}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            fontSize: '24px',
                            color: '#fff',
                        }}> Моя специальность:
                    </p> 
                    
                    {specs.map((worker, index) => index < 5 ? 
                        //worker.name 
                        <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '15px'}}>
                            <img src={worker.icon} alt=''/>
                            <MyButton onClick={handleClick} style={{width: "100%", 
                                    background: '#006095', 
                                    border: '1px solid #006095',
                                    display: 'flex',
                                    margin: '0 20px', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    zIndex: '6'}}>
                                    {worker.name} {showTable ? <img src={TreugolUp} alt='' width={25} style={{position: 'relative', zIndex: '2'}}/>
                                                            : <img src={TreugolDown} alt='' width={25} style={{position: 'relative', zIndex: '2'}}/>}
                            </MyButton>
                        </div>
                        : '' 
                    )}

                    
                     
                    {showTable ? <img className='table-image' src={Table1} alt='' width='95%' /> : '' }   
                </div> 

                {/* <div className='block-buttons-stavki'>
                    <Link to={'/menu'}><MyButton style={{marginTop: '100px', width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                </div> */}
            </form> 

            <div className='block-buttons-stavki' style={{}}>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', width: '120px'}} />
            </div>        
        </div>
    );
};


export default StavkiPage;