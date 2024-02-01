import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";

import btnChat from "../../image/new/btn_chat.svg"
import Vector from "../../image/new/vector.svg"
import MyModal from "../../components/MyModal/MyModal";

import Close from "../../image/new/close.svg"

const ProjectList = ({posts, title, width, shkala}) => {

    const [showInfoChat, setShowInfoChat] = useState(false)
    const [showInfoProj, setShowInfoProj] = useState(false)
    const [showMoreInfo, setShowMoreInfo] = useState(false)

    const clickShowInfoChat = () => {
        setShowInfoChat(true)
    }

    const clickShowInfoProj = () => {
        setShowInfoProj(true)
    }

    const clickAkcia = () => {
        setShowMoreInfo(false); 
        setShowInfoProj(false)
    }
    
    if (!posts.length) {
        return (
            // <h2 style={{textAlign: 'center', paddingTop: '80px', paddingBottom: '80px'}}>
            //     Проекты не найдены
            // </h2>
            <>
            <div className='container'>
                <div className='proj-card'>
                    <div className='rectangle-projcard'></div>
                    <div className='rectangle-projcard2'></div>
                    <div className='rectangle-projcard3'></div>

                    <div onClick={clickShowInfoProj}>
                        <div className='project-text'>
                            <p className="project_title">Здесь будут ваши проекты</p>
                            
                        </div>
                        <img className='vector' src={Vector} alt=''/>  
                    </div>

                    
                    <div className='card-footer'>
                        <div><p className='project_money2'>0.00</p></div>
                        <div onClick={clickShowInfoChat} className='chat-button'>Чат</div>
                    </div>
                </div>
            </div>

            <MyModal visible={showInfoChat} setVisible={setShowInfoChat}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'></p>
                    <p className='text-vagno' style={{top:"30%"}}>Эта кнопка добавит тебя в чат актуального проекта</p>
                    <div className='button-ok' onClick={()=>setShowInfoChat(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showInfoProj} setVisible={setShowInfoProj}>
                <div className='info-card' style={{height: '200px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <img onClick={()=>setShowInfoProj(false)} src={Close} alt='' style={{position: 'absolute', right: '18px', top: '18px', width: '15px'}}/>

                    <p className='vagno'></p>
                    <p className='text-promo'>Чтобы выйти на работу по проекту, выбери его в нужной рассылке и нажми кнопку «Принять».
<br/><br/>Бонус! «3 000 рублей за троих твоих друзей»</p>
                    {/* <div className='button-more' onClick={()=>setShowInfoProj(false)}>
                        <div className='rec-button'>Подробнее</div>         
                    </div> */}
                    <div className='button-ok' onClick={()=>setShowMoreInfo(true)}>
                        <div className='rec-button'>Об акции</div>         
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showMoreInfo} setVisible={setShowMoreInfo}>
                <div className='info-card' style={{height: '455px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'></p>
                    <p className='text-promo' style={{top: '25px'}}>Акция «3 000 рублей за троих твоих друзей».
                    <br/><br/>Скопируй свой ID и вместе с ним отправь приглашения троим друзьям, не подписанным на проекты «U.L.E.Y». 
<br/><br/>Для этого нажми Workhub внизу экрана, «+» в центре и поделись ссылкой. 
<br/><br/>Напомни другу, что в конце регистрации он должен указать твой ID.
<br/><br/>Ты, и каждый приглашенный тобою, получите по 3 000 рублей, как только все друзья отработают по 3 проекта [по 30 часов].
<br/><br/>Дружи пока молодой!</p>
                    <div className='button-ok' onClick={clickAkcia}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>
            </>
        )
    } else {
        //console.log("Кол-во проектов: ", posts.length)
    }

    return (
        <div className="list-item">
            <h1>
                {title}
            </h1>
                     

            {posts.map((post, index) =>
                <ProjectItem number={index + 1} post={post} key={post.id + index} width={width} />    
            )}
            
        </div>
    );
};

export default ProjectList;