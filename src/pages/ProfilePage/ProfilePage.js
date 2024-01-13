import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from "../../components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";

import ScrollToHashElement from "./../../components/ScrollToHashElement/ScrollToHashElement";
import copy from "copy-to-clipboard";

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


import Star from "../../image/new/star.png";
import StarActive from "../../image/new/star_activ.svg";
import Edit from "../../image/new/edit.svg"
import Vector from "../../image/new/vector.svg"
import VectorUp from "../../image/new/vector_up.svg"
import Workhub from "../../image/new/wokhub.svg"
import QRCode from "../../image/new/QR_Code.svg"
import Close from "../../image/new/close.svg"
import ClosePress from "../../image/new/close_press.svg"
import CopyIcon from "../../image/icons/clone.svg"

import Footer from "../../image/new/footer2.png"
import VK from "../../image/new/basil_vk-outline.svg"
import Phone from "../../image/new/ph_phone-call.svg"
import Web from "../../image/new/dashicons_admin-site-alt3.svg"
import Telegram from "../../image/new/basil_telegram-outline.svg"

import Friend from "../../image/new/button_plus.png"
import callPoster from "../../image/call_poster.png"
import BlackFon from "../../image/new/fon_grad.svg";
import DohodOpen from "../../image/new/dohodOpen.png";
import btnSave from "../../image/buttons/btn_add.png"

import specData from "../../data/specData"
import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';
import MarqueeModal from '../../components/UI/MarqueeModal/MarqueeModal';

import WorkerList2 from '../../components/WorkerList2/WorkerList2';

const ProfilePage = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();
    const { hash } = useLocation();

    const projectsRef = useRef(null)

    const { projects, setProjects, specId, setSpecId, flag, summa, setSumma } = useUsersContext();
    const { workerhub, setWorkerhub } = useUsersContext();
    const [workerId, setWorkerId] = useState('')
    const [projects2, setProjects2] = useState('')

    const [status, setStatus] = useState([{title: "Новые"}, {title: "Старые"}, {title: "Все"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, workerId); //specId '1408579113'
    const [sortProject, setSortProject] = useState([])

    const [showArroy, setShowArroy] = useState(true)

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [headerName, setHeaderName] = useState('Мой профиль');
    //const [scrollTop, setScrollTop] = useState(0);
    const { height, width } = useWindowDimensions();
    const [isLoadingSum, setIsLoadingSum] = useState(true);

    const [showHistory, setShowHistory] = useState(false);
    const [showKompet, setShowKompet] = useState(false);
    const [showDohod, setShowDohod] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showAddSpec, setShowAddSpec] = useState(false)

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    //select
    const [selectedElement, setSelectedElement] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [titleCat, setTitleCat] = useState(false)
    const [titleSpec, setTitleSpec] = useState(false)

    const {worker, setWorker, workers, setWorkers} = useUsersContext();
    const [showSpec, setShowSpec] = useState(false) 

    const [showBegun, setShowBegun] = useState(false)

    const API_URL = process.env.REACT_APP_API_URL
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже   
    useEffect(() => {
        const fetchData = async() => { 
            setIsProfileLoading(true)
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id '6143011220'
            //console.log("worker: ", worker.length) 
            //console.log(worker[0]?.id)
            setWorkerId(worker[0]?.id)
            setSpecId(worker[0]?.id)
            
            setTimeout(()=> {      
                if (worker.length > 0) {
                    //зарегистрирован
                    console.log("Зарегистирован", "REG")
                    //setSpecId(worker[0]?.id)
                    setIsProfileLoading(false)
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
            }, 2000)
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
                        console.log(newProject)
                        arrayProject.push(newProject)
                    }   
                })
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


    const [widthD, setWidthD] = useState(0)
    const [widthDX, setWidthDX] = useState(0)
    const [widthStr, setWidthStr] = useState(0)

    //бегущая строка
    useEffect(() => {
        //длина окна
        const widthD = width - (131 + 25)

        setWidthDX(widthD - widthStr)

        setShowBegun(false)
 
        setTimeout(()=> {
            if (widthStr > widthD) {
                setShowBegun(true)
            }
        }, 3000)

    }, [widthStr])

//---------------------------------------------------------------------


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





    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        //отправляем в админку сообщение
        //sendMyMessage(user?.id)

        // устанавливаем категории
        if (specData.length > 0 && specData) {
            setCategories(specData);
        }

        // и модели из первой категории по умолчанию
        if (specData.length > 0 && specData[0].models && specData[0].models.length > 0) {
            setModels(specData[0].models);
        }

    }, []);

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        //const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);
        const categoryId = e.target.value //parseInt(e.target.value);
        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);
        const catSelect = category.icon; //capitalizeFirst(category.name);
        const iconCatSelect = category.icon;

        setWorker({...worker, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const models = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setModels(models);

        setDisabled(false)
        setTitleSpec("")
    }

    // 2. выбор специальности
    const onSpecSelectChange = (e) => {
        setSelectedElement(e.target.value);

        const modelId = e.target.value //parseInt(e.target.options[e.target.selectedIndex].value);
        const model = models.find(item => item.id === modelId);

        setWorker({...worker, spec: model.name})

        setDisabledBtn(false)
    }


    {/* Добавление специальности */}
    const addNewWorker = (e) => {
        e.preventDefault();

        if (worker.cat !== '' || worker.spec !== '') {
            setWorkers([...workers, {...worker, id: Date.now()}])
        }


        setWorker({cat: '', spec: '', icon: ''})
        setSelectedElement("");

        setDisabled(true);
        setShowSpec(false)
        setDisabledBtn(true);

        setTitleCat("")
        setTitleSpec("")
        
        //setShowAddSpec(false)
        setShowSpec(true)
    }


    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {

            const data = {
                worklist: workers, 
                user,
                queryId,
            }
    
            tg.MainButton.hide();
    
            fetch(API_URL + 'web-addspec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                  
    }, [ workers, user ])



    const onClose = () => {
        tg.close()
    }

    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
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
        tg.MainButton.show();
    }, [])

    useEffect(() => {
        if (workers.length > 0) {
            tg.MainButton.setParams({
                text: 'Сохранить',
                color: '#000000' //'#2e2e2e'
            })
        } else {
            tg.MainButton.setParams({
                text: 'Workhub',
                color: '#26292c' //'#2e2e2e'
            })
        }
        
    }, [workers])


    const clickWorkhub = () => {
        showFooter ? setShowFooter(false) : setShowFooter(true)
    }

    useEffect(() => {
        if (workers.length > 0) {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            } 
        } else {
            tg.onEvent('mainButtonClicked', clickWorkhub)
            return () => {
                tg.offEvent('mainButtonClicked', clickWorkhub)
            }
        }
    }, [workers, clickWorkhub, onSendData])


    //скорировать телеграм id в буфер обмена
    const clickCopyID = () => {
        copy(user?.id)
        alert('ID скопирован!')
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">

            <Header header={{title: `${headerName}`, icon: 'false', menu: `${Workhub}`}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />

            {isProfileLoading
            ? <div style={{width: '100vw', display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}><Loader/></div>
            :<>
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
                                ?   <li className="bullet-title">{worker.name}  {index === workerhub[0]?.spec.length-1 && <img src={Edit} onClick={()=>setShowAddSpec(true)} alt='' style={{marginLeft: '20px', width: '12px'}}/>}</li>
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
                    <div className='block-id' onClick={clickCopyID}> ID {user?.id}</div>
                </article>

                <div style={{display: 'flex', marginTop: '15px', justifyContent: 'space-between'}}>
                    {/* Мерч */}
                    <article className='block-merch' onClick={clickInfo}> 
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
                            <div className='rectangle-kompeten'></div>
                            <div className='rectangle-kompeten2'></div>
                            <div className='rectangle-kompeten3'></div>
                            {/* <div className='rec1'></div>
                            <div className='rec2'></div>
                            <div className='rec3'></div> */}
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


                        {/* Доход */}
                        <article className='block-dohod' onClick={clickDohod} style={{display: showDohod || showKompet ? 'none' : 'block'}}> 
                            <div className='rectangle-dohod'></div>
                            <div className='rectangle-dohod2'></div>
                            <div className='rectangle-dohod3'></div>
                                {/* <img src={Dohod} alt='' /> */}
                            <div className='kompetencii-title'><p>Доход</p><img className='vector-icon' src={Vector} alt=''/></div>
                            <p className='summa-dohod'>{isLoadingSum ? <Loader2 /> : parseInt(summa).toLocaleString()+".00"}</p>
                        </article>
                    </div> 
                </div>

                

                {/* Доход */}
                <img src={DohodOpen} alt='' onClick={clickDohod} className='dohod-open' style={{display: showDohod ? 'block' : 'none'}}/>
                
                
                <article className='block-dohod-open' onClick={clickDohod} style={{display: showDohod ? 'block' : 'none'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><p>Доход</p><img className='vector-icon2' src={Vector} alt=''/></div> 
                    <p className='summa-dohod2'>{isLoadingSum ? <Loader2 /> : parseInt(summa).toLocaleString()+".00"}</p>
                </article>

                <article className='block-dohod2' style={{display: showDohod ? 'block' : 'none'}}> 
                    <p className='history-title'>История</p>
                    <div className='dates-history'><p>01.2024</p><p>0.00</p></div>
                    <div className='dates-history2'><p>02.2024</p><p>0.00</p></div>
                    <div className='dates-history2'><p>03.2024</p><p>0.00</p></div>
                </article> 
                
            </div>

            <div  ref={projectsRef}>

                <div className="profile-project-list">   
                    <Header 
                        header={{title: `Мои проекты`, icon: 'true', menu: 'меню'}}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    {isPostsLoading
                        ? <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}><Loader/></div>
                        : <ProjectList posts={sortProject} title="" width={width}/>
                    }
                </div> 
            </div>
            </>
            }

            <div className='footer-block' style={{display: showFooter ? 'block' : 'none'}}>
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

                    <p style={{position: 'absolute', width: '100%', top: '55px'}}>
                        Подпиши троих друзей за  <br/> 3 000.00 рублей!
                    </p>
                    <img src={QRCode} alt='' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>

                </div>
                <div className='block-modal-button'>
                    <div className='button_info' onClick={clickInfo}>Подробнее</div>
                    <div onClick={onShareClick} className='button_podel'>Поделиться</div>
                </div>
            </MyModal>

            <MyModal visible={modal} setVisible={setModal}>
            <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Важно</p>
                    <p className='text-vagno'>Рекомендуемый период времени для связи с менеджером</p>
                    <p className='text-vagno2'>10:00 - 20:00</p>
                    <div className='button-ok' onClick={()=>setModal(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showInfo} setVisible={setShowInfo}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Важно</p>
                    <p className='text-vagno'></p>
                    <div className='button-ok' onClick={()=>setShowInfo(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>


            <MyModal visible={showAddSpec} setVisible={setShowAddSpec}>
                <div className='info-card' style={{height: 'auto'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowAddSpec(false)} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>

                    <p className='vagno'>Добавить специальность</p>
                    <div style={{position: 'relative', marginTop: '60px', marginLeft: '25px', marginRight: '25px'}}>
                        <p className='cat-title' style={{display: titleCat ? 'none' : 'block'}}>Категория...</p>  
                        <NewSelect
                            id="category"
                            options={categories}
                            titleCat={titleCat}
                            setTitleCat={setTitleCat}
                            onChange={onCategoriesSelectChange}
                            heigthModal={true}
                        /> 
                    </div>
                                
                    <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px'}}>
                        <p className='spec-title' style={{display: titleSpec ? 'none' : 'block'}}>Специальность...</p> 
                        <NewSelect2
                            disabled={disabled}
                            id="model"
                            options={models}
                            titleSpec={titleSpec}
                            setTitleSpec={setTitleSpec}
                            onChange={onSpecSelectChange}
                            heigthModal={true}
                        />
                    </div>

                    <div style={{position: 'relative', marginRight: '25px'}}>
                        {/*список работников*/}
                        <div style={{
                            boxSizing: 'border-box', 
                            height: 'auto', 
                            zIndex: 20,
                        }}>
                            {
                            showSpec && 
                            <div className='fio-text'><WorkerList2 workers={workers} /></div>
                            }
                        </div>  

                        {/*кнопка Добавить*/}
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '15px'}}>
                            <button 
                                disabled={disabledBtn}
                                className="image-add-modal-button" 
                                style={{ backgroundImage: `url(${btnSave})`}}
                                onClick={addNewWorker}
                            >
                                Добавить
                            </button>
                        </div>
                         
                    </div>
                    {/* <div className='button-ok' onClick={()=>setShowAddSpec(false)}>
                        <div className='rec-button'>Добавить</div>                     
                    </div> */}
                </div>
            </MyModal>
            
        </div>
    );
};


export default ProfilePage;