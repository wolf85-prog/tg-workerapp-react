import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";

import btnChat from "../../image/new/btn_chat.svg"
import Vector from "../../image/new/vector.svg"
import Progress0 from "../../image/new/progress0.svg"


const ProjectList = ({posts, title, workerId, remove, width}) => {
    
    if (!posts.length) {
        return (
            // <h2 style={{textAlign: 'center', paddingTop: '80px', paddingBottom: '80px'}}>
            //     Проекты не найдены
            // </h2>

            <div className='container'>
                <div className='proj-card'>
                    <div className='rectangle-projcard'></div>
                    <div className='rectangle-projcard2'></div>
                    <div className='rectangle-projcard3'></div>

                    <div>
                        <div className='project-text'>
                            <p className="project_title">Здесь будут ваши проекты</p>
                            {/* <p className="project_subtitle">06.12.2023 | 20:00</p> */}
                            
                            <p className='project_money2'>0.00</p>
                        </div>
                        <img className='vector' src={Vector} alt=''/>  
                    </div>

                    <div className='progress'>
                        <img className='shkala' src={Progress0} alt=''/>
                    </div>
                    
                    <div className='card-footer'>
                        <div></div>
                        <div className='chat-button' style={{backgroundImage: `url(${btnChat})`}}>Чат</div>
                    </div>
                </div>
            </div>
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
                <ProjectItem number={index + 1} post={post} key={post.id + index} width={width}/>    
            )}
            
        </div>
    );
};

export default ProjectList;