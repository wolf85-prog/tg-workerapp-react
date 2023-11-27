import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext";
import {useProjects} from "../../hooks/useProjects"
import './ProfilePage.css';
import { getWorkerId, getProjectsCash, getSmetaCash } from '../../http/chatAPI';

import Loader from "../../components/UI/Loader/Loader";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import iconCheck from "../../image/check.png";
import iconUnCheck from "../../image/uncheck.png";
//import Loader from "../../components/UI/Loader/Loader";

import btnMenu from "../../image/layers/icon_menu.png";
import btnChange from "../../image/buttons/button_for_menu2.png"
import smallMenu from "../../image/layers/ULEY text.png"


//const API_URL = process.env.REACT_APP_API_URL

const ProfilePage = () => {
    const {user} = useTelegram();
    const navigate = useNavigate();
    //const { workerhub: worker } = useUsersContext();
    const { setSpecId, flag } = useUsersContext();
    const { projects, setProjects, specId} = useUsersContext();
    const { workerhub } = useUsersContext();

    const [status, setStatus] = useState([{title: "Все"}, {title: "Новые"}, {title: "Старые"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects, filter.sort, filter.query, specId); //specId '1408579113'

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const [isPostsLoading, setIsPostsLoading] = useState(false);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже   
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId('1408579113') //'805436270' '1408579113' user?.id '6143011220'
            console.log("worker: ", worker.length) 
            console.log(worker[0]?.id)
            setSpecId(worker[0]?.id)
            
            setTimeout(()=> {      
                if (worker.length > 0) {
                    //зарегистрирован
                    console.log("Зарегистирован", "REG")
                    setSpecId(worker[0]?.id)
                } else  {
                    if (flag === 'ONLY_REG') {
                        //только что зарегистрирован
                        console.log("Только что зарегистировался", flag)
                        navigate("/process")
                    } 
                    else if (flag === 'NOREG') {
                        //не зарегистрирован
                        console.log("Зарегистрируйтесь! NOREG")
                        navigate("/add-worker")
                    }
                }
            }, 10000)
        }

        fetchData()   
    }, []);

    useEffect(()=> {
        const fetchDataProjects = async () => {
            const arrayProject = []
                   
            console.log("Начинаю загружать проекты...")
            const projects = await getProjectsCash();

            console.log("Начинаю загружать сметы...")
            const smets = await getSmetaCash();
            console.log("smets: ", smets)

            projects.map((project)=> {
                let projObject = smets.find((proj) => proj.projectId === project.id)

                const newProject = {
                    id: project.id,
                    title: project.title,
                    date_start: project.dateStart,
                    date_end: project.dateEnd,
                    status: JSON.parse(project.status),
                    specs: JSON.parse(project.specs),
                    smeta: projObject ? JSON.parse(projObject?.dop) : "",
                }
                //console.log(newProject)
                arrayProject.push(newProject)
            })

            console.log(arrayProject)
            
            setProjects(arrayProject)        
        }

        fetchDataProjects()                    
    }, [])

    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  
    })

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мой профиль', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>


            <div className='form-profile'>
                <ol className="bullet">
                    <li><div className="bullet-title">ФИО</div>{workerhub[0]?.fio.split(' ')[0]}</li>
                    <li><div className="bullet-title"></div>{workerhub[0]?.fio.split(' ')[1]}</li>
                    {/* <li><div className="bullet-title">Город</div>{workerhub[0]?.city}</li> */}
                    <li><div className="bullet-title">Специальность</div>              
                        <table className="table-noborder">{workerhub[0]?.spec.map((worker, index) => index < 8 && worker.name !== 'Blacklist' ? <tr key={worker.id}><td>{worker.name}</td></tr> : '' )}</table>
                    </li>
                    <li><div className="bullet-title">Рейтинг</div>
                        &#9733;&#9733;&#9733;&#9733;&#9733;  
                    </li>                    
                    {/* <li><div className="bullet-title">Проекты с U.L.E.Y</div>{workerhub[0]?.rank}</li> */}
                    <li><div className="bullet-title">Компетенции</div></li>
                    {/* <li><div className="bullet-title">Замечания</div>{workerhub[0]?.comteg.map(item=>item.name).join(' ')}</li> */}
                    <li><div className="bullet-title">Мерч</div><img src={workerhub[0]?.merch.length > 0 ? iconCheck : iconUnCheck} alt='' width='25px' height='25px'/></li>
                    <li><div className="bullet-title"></div>{workerhub[0]?.merch.map(item=>item.name).join(' | ')}</li>
                    <li><div className="bullet-title">Общая сумма дохода</div><span style={{fontSize: '22px'}}>1 000</span></li>
                </ol>
                <div style={{display: 'flex', justifyContent: 'center', zIndex: '12', position: 'relative'}}>
                    <Link to={'/edit-worker'}><button className="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Внести изменения</button></Link>
                </div>


                {/* Проекты */}
                <ProjectFilter
                    filter={filter}
                    setFilter={setFilter}
                    arr_status={status}
                />

                <div className="project-list">                   
                    {isPostsLoading
                        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                        : <ProjectList posts={sortedAndSearchedPosts} title="" workerId={specId}/>
                    }
                </div> 
                
            </div>
            

            <div className='footer-block'>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>
            
        </div>
    );
};


export default ProfilePage;