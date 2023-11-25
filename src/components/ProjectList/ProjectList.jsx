import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";


const ProjectList = ({posts, title, workerId, remove}) => {
    
    if (!posts.length) {
        return (
            <h2 style={{textAlign: 'center', paddingTop: '80px'}}>
                Проекты не найдены
            </h2>
        )
    } else {
        console.log("Кол-во проектов: ", posts.length)
    }

    return (
        <div className="list-item">
            <h1>
                {title}
            </h1>
                     

            {posts.map((post, index) =>
                <ProjectItem number={index + 1} post={post} key={post.id} specId={workerId}/>    
            )}
            
        </div>
    );
};

export default ProjectList;