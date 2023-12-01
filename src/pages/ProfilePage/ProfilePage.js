import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

import { useTelegram } from "../../hooks/useTelegram";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useUsersContext } from "../../contexts/UserContext";
import {useProjects} from "../../hooks/useProjects"
import './ProfilePage.css';
import { getWorkerId, getProjectsCash, getSmetaCash } from '../../http/chatAPI';

import Loader from "../../components/UI/Loader/Loader";
import Loader2 from "../../components/UI/Loader_min/Loader_min"
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import iconCheck from "../../image/check.png";
import iconUnCheck from "../../image/uncheck.png";
import iconEdit from "../../image/icons/edit_icon.png";
import iconDown from "../../image/icons/arrow_down.png";
//import Loader from "../../components/UI/Loader/Loader";

import ButtonsMenu from "../../image/buttons/button_menu.png"
import ButtonsMenu2 from "../../image/buttons/button_for_menu2.png"
import btnMenu from "../../image/layers/icon_menu.png";
import btnChange from "../../image/buttons/button_for_menu2.png"
import smallMenu from "../../image/layers/logo_04_light.png"


//const API_URL = process.env.REACT_APP_API_URL

const ProfilePage = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();

    //const { workerhub: worker } = useUsersContext();
    const { setSpecId, flag } = useUsersContext();
    const { projects, setProjects, specId} = useUsersContext();
    const { workerhub } = useUsersContext();
    const [workerId, setWorkerId] = useState('')
    const [projects2, setProjects2] = useState('')

    const [status, setStatus] = useState([{title: "Все"}, {title: "Новые"}, {title: "Старые"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, workerId); //specId '1408579113'

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [showArroy, setShowArroy] = useState(true)

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [headerName, setHeaderName] = useState('Мой профиль');
    const [scrollTop, setScrollTop] = useState(0);
    const { height, width } = useWindowDimensions();
    const [isLoadingSum, setIsLoadingSum] = useState(true);

    const [showHistory, setShowHistory] = useState(false);

    const [summa, setSumma] = useState(0); 
  
    const randomNumberInRange = (min, max) => { 
        return Math.floor(Math.random()  
                * (max - min + 1)) + min; 
    }; 
   
        
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже   
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id '6143011220'
            console.log("worker: ", worker.length) 
            console.log(worker[0]?.id)
            setWorkerId(worker[0]?.id)
            
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

//---------------------------------------------------------------------
    useEffect(()=> {
        const fetchDataProjects = async () => {
            const arrayProject = []
            setIsPostsLoading(true)
                   
            console.log("Начинаю загружать проекты...")
            const projects = await getProjectsCash();

            console.log("Начинаю загружать сметы...")
            const smets = await getSmetaCash();
            console.log("smets: ", smets)

            let tempSum = 0
            projects.map((project, index)=> {
                let projObject = smets.find((proj) => proj.projectId === project.id)

                const newProject = {
                    id: project.id,
                    title: project.title,
                    date_start: project.dateStart,
                    date_end: project.dateEnd,
                    status: JSON.parse(project.status),
                    specs: JSON.parse(project.specs),
                    smeta: projObject ? JSON.parse(projObject?.dop) : "",
                    statusMoney: randomNumberInRange(1, 5)
                }

                arrayProject.push(newProject)
            })

            const tempArr = [...arrayProject].filter(post=> post.specs.find(item => item.id === workerId))
            tempArr.map((item)=> {
                console.log("ставка: ", item.smeta ? item.smeta.find((item2) => item2.fio_id === workerId)?.specialist : 0)
                if (item.smeta) {
                    tempSum = tempSum + item.smeta.find((item2) => item2.fio_id === workerId)?.specialist
                }
                
            })
            setSumma(tempSum)
            setIsLoadingSum(false)

            console.log(arrayProject)

            setTimeout(()=> {
                setProjects2(arrayProject)  
            
                setIsPostsLoading(false)   
            }, 3000)      
            
        }

        fetchDataProjects()                    
    }, [])

//---------------------------------------------------------------------
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  
    })

    const handleScroll = (e) => {
        if (e.currentTarget.scrollTop < 300) {
           setHeaderName("Мой профиль"); 
        } else if (e.currentTarget.scrollTop > 300) {
            setHeaderName("Мои проекты");
            setShowArroy(false) 
        }
        
    };

    const onClose = () => {
        tg.close()
    }

    useEffect(()=>{
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])


    const showQRCode = () => {
        navigate('/process')
    }

    {/* Показать  */}
    const clickShowHistory = (e) => {
        e.preventDefault();

        showHistory ? setShowHistory(false) : setShowHistory(true)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: `${headerName}`, icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>


            <div className='form-profile' onScroll={handleScroll}>
                <ol className="bullet">
                    <li><div className="bullet-title">ФИО</div>{workerhub[0]?.fio.split(' ')[0]}</li>
                    <li><div className="bullet-title"></div>{workerhub[0]?.fio.split(' ')[1]} {workerhub[0]?.fio.split(' ')[2]}</li>
                    {/* <li><div className="bullet-title">Город</div>{workerhub[0]?.city}</li> */}
                    <li><div className="bullet-title">Специальность </div> 
                        <Link to={'/edit-worker'} style={{position: 'absolute', left: '140px'}}><img src={iconEdit} alt='' style={{ width: '22px', height: '22px'}}/></Link>             
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
                    <li><div className="bullet-title" style={{margin: 'auto 0'}}>Общая сумма дохода</div><span style={{fontSize: '26px', margin: 'auto 0'}}>{isLoadingSum ? <Loader2 /> : parseInt(summa).toLocaleString()+".00"}</span></li>
                    <li><div style={{width: '100%', marginRight: '20px'}}><button onClick={clickShowHistory} className='history-button' style={{padding: '5px 10px', backgroundImage: `url(${btnChange})`}}>История</button></div></li>
                </ol>   

                <div>
                    <ol className="bullet" style={{ display: showHistory ? "block" : "none" }}>
                        <li><div className="bullet-title">Ноябрь 2023 [Подтверждено]</div><div>10 000.00</div></li>
                        <li><div className="bullet-title">Октябрь 2023 [Оплачено]</div><div>10 000.00</div></li>
                        <li><div className="bullet-title">Сентябрь 2023 [Оплачено]</div><div>10 000.00</div></li>
                    </ol>
                </div>         

                {/* Кнопка Пригласить друга */}
                <div style={{display: 'flex', justifyContent: 'center', zIndex: '12', position: 'relative'}}>
                    <button className="image-button2" onClick={showQRCode} style={{ backgroundImage: `url(${btnChange})`}}>Пригласить друга</button>
                </div>


                {/* Проекты */}
                <div style={{position: 'absolute', top: height, width: '100%'}}>
                    <ProjectFilter
                        filter={filter}
                        setFilter={setFilter}
                        arr_status={status}
                    />

                    <div className="profile-project-list">                   
                        {isPostsLoading
                            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                            : <ProjectList posts={sortedAndSearchedPosts} title="" workerId={specId}/>
                        }

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Link to={'/info'}><button className="image-button3" style={{ backgroundImage: `url(${ButtonsMenu})`}}>Инфо</button></Link>
                            <Link to={'/contacts'}><button className="image-button3" style={{ backgroundImage: `url(${ButtonsMenu})`}}>Связь</button></Link> 
                        </div>

                    </div> 
                </div>

            </div>
            
            {/* стрелка */}
            <div className='down-icon'><img src={iconDown} className='down-image' alt='' style={{width: '80px', visibility: showArroy ? "visible": "hidden"}} /></div>

            <div className='footer-block'>
                {/* <Link to={'/menu'}><img src={btnMenu} alt='' /></Link> */}
                <div></div>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>
            
        </div>
    );
};


export default ProfilePage;