import React, {useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";

import btnChat from "../../image/new/btn_chat.svg"
import Vector from "../../image/new/vector.svg"
import MyModal from "../../components/MyModal/MyModal";

const ProjectList = ({posts, title, width, shkala}) => {

    const [showInfoChat, setShowInfoChat] = useState(false)
    const [showInfoProj, setShowInfoProj] = useState(false)

    const clickShowInfoChat = () => {
        setShowInfoChat(true)
    }

    const clickShowInfoProj = () => {
        setShowInfoProj(true)
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
                            
                            <p className='project_money2'>0.00</p>
                        </div>
                        <img className='vector' src={Vector} alt=''/>  
                    </div>

                    
                    <div className='card-footer'>
                        <div></div>
                        <div onClick={clickShowInfoChat} className='chat-button' style={{backgroundImage: `url(${btnChat})`}}>Чат</div>
                    </div>
                </div>
            </div>

            <MyModal visible={showInfoChat} setVisible={setShowInfoChat}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'></p>
                    <p className='text-vagno' style={{top:"30%"}}>В твоем будущем проекте эта кнопка направит тебя в чат проекта</p>
                    <div className='button-ok' onClick={()=>setShowInfoChat(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>

            <MyModal visible={showInfoProj} setVisible={setShowInfoProj}>
                <div className='info-card' style={{height: '270px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Важно</p>
                    <p className='text-promo'>Чтобы выйти на проект, выбери его в нужной рассылке и нажми кнопку «Принять».
<br/><br/>Бонус — получи 3000 рублей!  Отправь приглашение трем друзьям и каждый из них тоже получит бонус 3000 рублей! Вместе с приглашением отправь им свой ID!</p>
                    <div className='button-ok' onClick={()=>setShowInfoProj(false)}>
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