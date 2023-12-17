import React, { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";

import ScrollToHashElement from "./../../components/ScrollToHashElement/ScrollToHashElement";

import { useTelegram } from "../../hooks/useTelegram";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useUsersContext } from "../../contexts/UserContext";
import {useProjects} from "../../hooks/useProjects"
import './ProfilePage.css';
import { getWorkerId, getProjectsCash, getSmetaCash } from '../../http/chatAPI';

import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";
import Loader2 from "../../components/UI/Loader_min/Loader_min"
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";


import Star from "../../image/new/star.svg";
import StarActive from "../../image/new/star_activ.svg";
import Edit from "../../image/new/edit.svg"
import Vector from "../../image/new/vector.svg"
import VectorUp from "../../image/new/vector_up.svg"
import Workhub from "../../image/new/wokhub.svg"
import QRCode from "../../image/new/QR_Code.svg"
import Close from "../../image/new/close.svg"
import ClosePress from "../../image/new/close_press.svg"

import Footer from "../../image/new/footer2.png"
import VK from "../../image/new/basil_vk-outline.svg"
import Phone from "../../image/new/ph_phone-call.svg"
import Web from "../../image/new/dashicons_admin-site-alt3.svg"
import Telegram from "../../image/new/basil_telegram-outline.svg"

import Friend from "../../image/new/friends.svg"
import callPoster from "../../image/call_poster.png"
import BlackFon from "../../image/new/fon_grad.svg";

import ButtonsMenu from "../../image/buttons/button_menu_old.png"

const ProfilePage = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();
    const { hash } = useLocation();

    const projectsRef = useRef(null)

    const { projects, setProjects, specId, setSpecId, flag, summa, setSumma } = useUsersContext();
    const { workerhub } = useUsersContext();
    const [workerId, setWorkerId] = useState('')
    const [projects2, setProjects2] = useState('')

    const [status, setStatus] = useState([{title: "Новые"}, {title: "Старые"}, {title: "Все"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, workerId); //specId '1408579113'
    const [sortProject, setSortProject] = useState([])

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [showArroy, setShowArroy] = useState(true)

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [headerName, setHeaderName] = useState('Мой профиль');
    const [scrollTop, setScrollTop] = useState(0);
    const { height, width } = useWindowDimensions();
    const [isLoadingSum, setIsLoadingSum] = useState(true);

    const [showHistory, setShowHistory] = useState(false);
    const [showKompet, setShowKompet] = useState(false);
    const [showDohod, setShowDohod] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    //const [summa, setSumma] = useState(0); 
  
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
            setSpecId(worker[0]?.id)
            
            setTimeout(()=> {      
                if (worker.length > 0) {
                    //зарегистрирован
                    console.log("Зарегистирован", "REG")
                    //setSpecId(worker[0]?.id)
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
            console.log("projects: ", projects)

            console.log("Начинаю загружать сметы...")
            const smets = await getSmetaCash();
            console.log("smets: ", smets)

            let tempSum = 0
            projects.map((project, index)=> {
                let smetaObject = smets.find((proj) => proj.projectId === project.id)

                const specsArr = JSON.parse(project.specs)
                //console.log("specsArr: ", specsArr)

                //if (smetaObject) {
                    specsArr.map((spec, index) => {
                        if (spec.id === workerId) {
                            const newProject = {
                                id: project.id,
                                title: project.title,
                                date_start: project.dateStart,
                                date_end: project.dateEnd,
                                tgURL_chat: project.tgURLchat,
                                status: JSON.parse(project.status),
                                specs: spec, 
                                smeta: smetaObject ? JSON.parse(smetaObject?.dop) : "",
                                finalSmeta: smetaObject ? smetaObject?.final : "",
                                statusMoney: smetaObject ? (JSON.parse(smetaObject?.dop).find((item) => item.fio_id === workerId)?.specialist ? 2 : 1) : 1
                            }

                            arrayProject.push(newProject)
                        }   
                    })
                //} 
                

                // const newProject = {
                //     id: project.id,
                //     title: project.title,
                //     date_start: project.dateStart,
                //     date_end: project.dateEnd,
                //     tgURL_chat: project.tgURLchat,
                //     status: JSON.parse(project.status),
                //     specs: JSON.parse(project.specs), //specsArr.filter((item)=> item.id === workerId)[0],
                //     smeta: smetaObject ? JSON.parse(smetaObject?.dop) : "",
                //     finalSmeta: smetaObject ? smetaObject?.final : "",
                //     statusMoney: smetaObject ? (JSON.parse(smetaObject?.dop).find((item) => item.fio_id === workerId)?.specialist ? 2 : 1) : 1
                // }

                //arrayProject.push(newProject)
            })

            const tempArr = [...arrayProject].filter(post=> post.specs.id === workerId) //find(item => item.id === workerId))
            console.log("tempArr: ", tempArr)
            tempArr.map((item)=> {
                if (item.smeta ) {
                    console.log("смета: ", item.smeta)
                    tempSum = tempSum + item.smeta.find((item2) => item2.fio_id === workerId)?.specialist
                }   
                console.log("tempSum: ", tempSum)
            })

            setSumma(tempSum)
            setIsLoadingSum(false)

            setProjects2(arrayProject)     
            setIsPostsLoading(false)          
        }

        fetchDataProjects()                    
    }, [workerId])

    useEffect(()=> {
        const sortArray = []
        console.log(filter.query)

        sortedAndSearchedPosts.map((project)=> {
            //console.log(project)
            const newProject = {
                id: project.id,
                title: project.title,
                date_start: project.date_start,
                date_end: project.date_end,
                dateMain: project.specs.date, //find(item => item.id === workerId).date,
                tgURL_chat: project.tgURL_chat,
                status: project.status,
                specs: project.specs,
                smeta: project.smeta,
                finalSmeta: project.finalSmeta,
                statusMoney: project.statusMoney,
            }
            sortArray.push(newProject)
        })
        console.log("change: ", sortArray)

        const currentDate = new Date()

        if (filter.query === 'Старые') {
            const newArray = [...sortArray].sort((a, b) => {
                var dateA = new Date(a['dateMain']), dateB = new Date(b['dateMain'])                    
                //return dateA-dateB  //сортировка по возрастающей дате     
                return dateB-dateA  //сортировка по убывающей дате  
            })
            setSortProject(newArray.filter(item => new Date(item.dateMain).getTime() < currentDate.getTime()))
        
        } else if (filter.query === 'Новые') {

            const newArray = [...sortArray].sort((a, b) => {
                var dateA = new Date(a['dateMain']), dateB = new Date(b['dateMain'])                    
                return dateA-dateB  //сортировка по возрастающей дате     
                //return dateB-dateA  //сортировка по убывающей дате  
            })
            //console.log("date: ", new Date(newArray[0].dateMain).getTime())
            setSortProject(newArray.filter(item => new Date(item.dateMain).getTime() > currentDate.getTime()))
        
        } else if (filter.query === 'Все') {
            const newArray = [...sortArray].sort((a, b) => {
                var dateA = new Date(a['dateMain']), dateB = new Date(b['dateMain'])                    
                //return dateA-dateB  //сортировка по возрастающей дате     
                return dateB-dateA  //сортировка по убывающей дате  
            })

            setSortProject(newArray)
        } 

    }, [sortedAndSearchedPosts])

//---------------------------------------------------------------------
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  

        //executeScroll()
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
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#343A41') // установка цвета бэкграунда
        
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

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Workhub',
            color: '#343A41' //'#2e2e2e'
        })
    }, [])


    const clickWorkhub = () => {
        showFooter ? setShowFooter(false) : setShowFooter(true)
    }

    useEffect(() => {
        tg.onEvent('mainButtonClicked', clickWorkhub)
        return () => {
            tg.offEvent('mainButtonClicked', clickWorkhub)
        }
    }, [clickWorkhub])

    

    useEffect(() => {
        tg.MainButton.show();     
    }, [])


    const showQRCode = () => {
        navigate('/process')
    }

    {/* Показать  */}
    const clickShowHistory = (e) => {
        e.preventDefault();

        showHistory ? setShowHistory(false) : setShowHistory(true)
    }

    useEffect(()=> {
        console.log("hash: ", hash)
        if (hash === '#section-two') {
            setTimeout(()=> {
                executeScroll(projectsRef)
            }, 1000)
           
        }
    }, [hash])

    const executeScroll = (projectsRef) => {
        projectsRef.current.scrollIntoView({behavior: 'smooth'})
    }



    const clickKompeten = () => {
        showKompet ? setShowKompet(false) : setShowKompet(true)
    }

    
    const clickDohod = () => {
        showDohod ? setShowDohod(false) : setShowDohod(true)
    }

    const clickPodel = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }

    const clickInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }


    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const showPopup = () => {   
        setModal(true)
        //setTimeout(()=> {
            openInNewTab('tel:+74995001411')
        //}, 2000)

        setTimeout(()=> {
            setModal(false)       
        }, 6000)
    }


    //share
    const [isShowed, setIsShowed] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (!isCopied) return
    
        const timer = setTimeout(() => {
          setIsCopied(currentIsCopied => !currentIsCopied)
        }, 3000)
    
        return () => clearTimeout(timer)
    }, [isCopied])
  
    const onShareClick = (e) => {
        const url="https://t.me/ULEY_Workhub_Bot"
        const title="ULEY Workhub"
        const text="U.L.E.Y | Workhub"

        e.preventDefault()
        if (navigator.share) {
            navigator.share({
            title: title,
            text: text,
            url: url,
            })
            .catch(console.error)
        } else {
            setIsShowed(currentIsShowed => !currentIsShowed)
        }
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">

            <Header header={{title: `${headerName}`, icon: 'false', menu: `${Workhub}`}}/>

            {/* темный фон */}
            {/* <img src={BlackFon} alt='' className='fon-black' /> */}

            <div className="container">
                {/* ФИО */}
                <article className="card">
                    <div className="rectangle"><div className="rectangle2"><div className="rectangle3"></div></div>
                    </div>
                    <div>
                        <p className="profile_fio">{workerhub[0]?.fio}</p>
                        <div className="card-specs bullet">
                            <ul>
                                {workerhub[0]?.spec.map((worker, index) => index < 8 && worker.name !== 'Blacklist' 
                                ?   <li className="bullet-title">{worker.name}  {index === workerhub[0]?.spec.length-1 && <img src={Edit} onClick={()=>navigate('/edit-worker')} alt='' style={{marginLeft: '20px'}}/>}</li>
                                : '' )}
                            </ul>   
                        </div>     
                    </div>
                    
                    <div className="star-block">
                        <img className='star-icon' src={StarActive} alt='' /> 
                        <img className='star-icon' src={StarActive} alt='' />
                        <img className='star-icon' src={StarActive} alt='' />
                        <img className='star-icon' src={Star} alt='' />
                        <img className='star-icon' src={Star} alt='' />
                    </div>
                    <div className='block-id'>ID {user?.id}</div>
                </article>

                <div style={{display: 'flex', marginTop: '15px'}}>
                    {/* Мерч */}
                    <article className='block-merch'> 
                            <div className='rectangle-merch'></div>
                            <div className='rectangle-merch2'></div>
                            <div className='rectangle-merch3'></div> 

                            <div className='rectangle-circle'>
                                <div className={workerhub[0]?.merch.length > 0 ? 'rectangle-circle-on' : 'rectangle-circle-off'}></div>
                            </div>

                            <p className='merch-title'>Мерч</p>
                            <div className='perechislenie'>
                                {workerhub[0]?.merch.map(item=> 
                                        <p className="">{item.name}</p>
                                )}
                                {/* <p className="">Sound</p>
                                <p className="">Production</p>  */}
                            </div>
                    </article>

                    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', marginLeft: '10px', flex: '0 0 56%'}}>
                        {/* Компетенции */}
                        <article className='block-kompetencii' style={{display: !showKompet ? 'block' : 'none'}}> 
                            <div className='rectangle-kompeten'></div>
                            <div className='rectangle-kompeten2'></div>
                            <div className='rectangle-kompeten3'></div>
                            <div className='kompetencii-title' onClick={clickKompeten}>
                                <p className='text-kompetencii'>Компетенции</p>
                                <img className='vector-icon' src={Vector} alt=''/>
                            </div>
                        </article>

                        {/* open */}
                        <article className='block-kompetencii-open' style={{display: showKompet ? 'block' : 'none'}}> 
                            <div className='rec1'></div>
                            <div className='rec2'></div>
                            <div className='rec3'></div>
                            <div className='kompetencii-title' onClick={clickKompeten}>
                                <p className='text-kompetencii' >Компетенции</p>
                                <img className='vector-icon' src={VectorUp} alt=''/>
                            </div>
                            <div className='kompet-list'>
                                <ul>
                                    <li>Работа с оборудованием</li>
                                    <li>Технические навыки</li>
                                    <li>Визуальное восприятие</li>
                                    <li>Коммуникация </li>
                                    <li>Работа со сценарием</li>
                                </ul>
                            </div>
                        </article>
                    </div> 
                </div>

                {/* Доход */}
                <div className='dohod'>
                   <div className='wrap-dohod' onClick={clickDohod}>
                        <div className='inner1' style={{borderBottomRightRadius: showDohod ? '0px' : '21.6px'}}></div>
                        <article className='block-dohod' style={{borderRadius: showDohod ?  '21.6px 21.6px 0 0' : '21.6px', height: showDohod ? '118px' : '110px', backgroundColor: showDohod ? '#2b2f33' : '#1F2021'}}> 
                            <div className='rectangle-dohod' style={{borderRadius: showDohod ? '21.6px 21.6px 0 0' : '21.6px'}}></div>
                            <div className='rectangle-dohod2' style={{borderRadius: showDohod ? '21.6px 21.6px 0 0' : '21.6px'}}></div>
                            <div className='rectangle-dohod3'></div>
                            <div className='kompetencii-title'><p>Доход</p><img className='vector-icon' src={showDohod ? VectorUp : Vector} alt=''/></div>
                            <p className='summa-dohod'>{isLoadingSum ? <Loader2 /> : parseInt(summa).toLocaleString()+".00"}</p>
                        </article>    
                    </div>

                    <article className='block-dohod2' style={{display: showDohod ? 'block' : 'none'}}> 
                        <div className='rectangle-dohod' style={{borderRadius: showDohod ? '21.6px 0 21.6px 21.6px' : '21.6px'}}></div>
                        <div className='rectangle-dohod2' style={{borderRadius: showDohod ? '21.6px 0 21.6px 21.6px' : '21.6px'}}></div>
                        <div className='rectangle-dohod3'></div>
                        <p className='history-title'>История</p>
                        <div className='dates-history'><p>11.2023</p><p>0.00</p></div>
                        <div className='dates-history2'><p>10.2023</p><p>0.00</p></div>
                        <div className='dates-history2'><p>09.2023</p><p>0.00</p></div>
                    </article>  
                </div> 
            </div>
            

            {/* <div className='form-profile' onScroll={handleScroll}>
                <div style={{height: height}}>
                    <ol className="bullet" id='section-one'>
                        <li><div className="bullet-title">ФИО</div>{workerhub[0]?.fio.split(' ')[0]}</li>
                        <li><div className="bullet-title"></div>{workerhub[0]?.fio.split(' ')[1]} {workerhub[0]?.fio.split(' ')[2]}</li>
                        <li><div className="bullet-title">Специальность </div> 
                            <Link to={'/edit-worker'} style={{position: 'absolute', left: '140px'}}><img src={iconEdit} alt='' style={{ width: '22px', height: '22px'}}/></Link>             
                            <table className="table-noborder">
                                <tbody>
                                {workerhub[0]?.spec.map((worker, index) => index < 8 && worker.name !== 'Blacklist' 
                                ?   <tr key={worker.id}>
                                        <td>{worker.name}</td>
                                    </tr> 
                                : '' )}
                                </tbody>
                            </table> 
                        </li>
                        <li><div className="bullet-title">Рейтинг</div>
                            &#9733;&#9733;&#9733;&#9733;&#9733;  
                        </li>                    
                        <li><div className="bullet-title">Компетенции</div></li>
                        <li><div className="bullet-title">Мерч</div><img src={workerhub[0]?.merch.length > 0 ? iconCheck : iconUnCheck} alt='' width='25px' height='25px'/></li>
                        <li><div className="bullet-title"></div>{workerhub[0]?.merch.map(item=>item.name).join(' | ')}</li>
                        <li><div className="bullet-title" style={{margin: 'auto 0'}}>Общая сумма дохода</div><span style={{fontSize: '26px', margin: 'auto 0'}}>{isLoadingSum ? <Loader2 /> : parseInt(summa).toLocaleString()+".00"}</span></li>
                        <li><div style={{width: '100%'}}><button onClick={clickShowHistory} className='history-button'>История</button></div></li>
                    </ol>   

                    <div>
                        <ol className="bullet" style={{ display: showHistory ? "block" : "none" }}>
                            <li><div className="bullet-title history">11.2023 <img src={iconCheck2} className='icon-history' /></div><div>0.00</div></li>
                            <li><div className="bullet-title history">10.2023 <img src={iconStatus} className='icon-history' /></div><div>0.00</div></li>
                            <li><div className="bullet-title history">09.2023 <img src={iconStatus2} className='icon-history' /></div><div>0.00</div></li>
                        </ol>
                    </div>         

                    <div style={{display: 'flex', justifyContent: 'center', zIndex: '12', position: 'relative'}}>
                        <button className="image-button2" onClick={showQRCode} style={{ backgroundImage: `url(${btnChange})`}}>Пригласить друга</button>
                    </div> 
                </div>

        
                <div  ref={projectsRef}>
                    <ProjectFilter
                        filter={filter}
                        setFilter={setFilter}
                        arr_status={status}
                    />

                    <div className="profile-project-list">                   
                        {isPostsLoading
                            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%', marginBottom: '50%'}}><Loader/></div>
                            : <ProjectList posts={sortProject} title="" workerId={specId}/>
                        }

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button className="image-button3" onClick={()=>navigate('/contacts')} style={{ backgroundImage: `url(${ButtonsMenu})`}}>Связь</button>
                        </div>

                    </div> 
                </div>

            </div> */}

            

            <div  ref={projectsRef}>
                {/* <ProjectFilter
                    filter={filter}
                    setFilter={setFilter}
                    arr_status={status}
                /> */}

                <div className="profile-project-list">   
                    <Header 
                        header={{title: `Мои проекты`, icon: 'true', menu: 'меню'}}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    {isPostsLoading
                        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%', marginBottom: '50%'}}><Loader/></div>
                        : <ProjectList posts={sortProject} title="" workerId={specId} width={width}/>
                    }
                </div> 
            </div>

            
            {/* стрелка */}
            {/* <div className='down-icon'><img src={iconDown} className='down-image' alt='' style={{width: '80px', display: showArroy ? "block": "none"}} /></div> */}

            <div className='footer-block' style={{display: !showFooter ? 'block' : 'none'}}>
                <img onClick={clickPodel} src={Friend} alt='' width='100%' className='btn-friend' />
                <img src={Footer} alt='' width='100%' className='footer-image' />
                <div className='footer-rec'></div>
                <div className='footer-icons'>
                    <img onClick={()=>showPopup()} src={Phone} alt='' width='100%' className='icon-footer' />
                    <img onClick={()=>openInNewTab('https://uley.team/')} src={Web} alt='' width='100%' className='icon-footer' />
                </div>
                <div className='footer-icons2'> 
                    <img onClick={() =>openInNewTab('https://t.me/ULEY_Office_Bot')} src={Telegram} alt='' width='100%' className='icon-footer' />
                    <img onClick={()=>openInNewTab('https://vk.com/uley.team')} src={VK} alt='' width='100%' className='icon-footer' />   
                </div>
                
            </div>


            <MyModal visible={showModal} setVisible={setShowModal}>
                <div className='qr-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowModal(false)} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '20px'}}/>

                    <p style={{position: 'absolute', width: '100%', top: '65px'}}>
                        Пригласи друга и получи скидку
                    </p>
                    <img src={QRCode} alt='' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>

                </div>
                <div className='block-modal-button'>
                    <div className='button_info' onClick={clickInfo}>Подробнее</div>
                    <div onClick={onShareClick} className='button_podel'>Поделиться</div>
                </div>
            </MyModal>

            <MyModal visible={modal} setVisible={setModal}>
                <img src={callPoster} alt='' style={{width: '100%', padding: '0 10px'}}/>
            </MyModal>

            <MyModal visible={showInfo} setVisible={setShowInfo}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Важно</p>
                    <p className='text-vagno'>Здесь будет Ваш текст</p>
                    <div className='button-ok' onClick={()=>setShowInfo(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>
            
        </div>
    );
};


export default ProfilePage;