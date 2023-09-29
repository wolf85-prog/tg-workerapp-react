import React from 'react';
import './ProjectItem.css';
import {useNavigate} from "react-router-dom";

const ProjectItem = (props) => {

    const navigate = useNavigate();
   
    const statusColor = props.post.status == null ? 'gray' : props.post.status.color;
    const dateProject = props.post.date_start != null ? props.post.date_start : '';
    const dateProject2 = props.post.date_end != null ? props.post.date_end : '';

    let d_end, year2, date2, month2, chas2, minut2;

    const d = new Date(dateProject);

    //time start
    const year = d.getFullYear()
    const month = String(d.getMonth()).padStart(2, "0"); 
    const date = String(d.getDate()).padStart(2, "0"); 
    const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
    const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();

    //time end
    if (dateProject2) {
        d_end = new Date(dateProject2);
        year2 = d_end.getFullYear()
        date2 = String(d_end.getDate()).padStart(2, "0"); 
        month2 = String(d_end.getMonth()).padStart(2, "0"); 
        chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
        minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
    } 

    const formatted = (d_end) ? `${date}.${month}.${year} - ${date2}.${month2}.${year2}` : `${date}.${month}.${year}`;
    const formattime = `${chas}:${minut}`

    const onShowProject = () => {
        navigate('/smeta', {
            state: {
              proj: props.number,
            }
        })
    }

    return (
        <div className={`box ${statusColor}`} onClick={onShowProject}>
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div>Дата: <span className="subscribe">{formatted}</span> </div>
                <div>Начало: <span className="subscribe">{formattime}</span> </div>
                <div style={{fontSize: '14px'}}>
                    300.00 рублей х 10 часов = 3 000.00 руб.
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;