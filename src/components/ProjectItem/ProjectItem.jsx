import React from 'react';
import './ProjectItem.css';
import ProjectWorkList from '../ProjectWorkList/ProjectWorkList';

const ProjectItem = (props) => {
   
    const statusColor = props.post.status == null ? 'gray' : props.post.status.color;
    const dateProject = props.post.date_start != null ? props.post.date_start : '';
    const dateProject2 = props.post.date_end != null ? props.post.date_end : '';

    let count = 0;
    let count2 = 0;
    let d_end, year2, date2, month2, chas2, minut2;

    const d = new Date(dateProject);

    // console.log("dateProject2: ", dateProject2)
    // console.log("d_end: ", d_end)

    //const d2 = dateProject != '' ? dateProject.split('T')[1] : '';

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
        date2 = d_end.getDate()
        month2 = String(d_end.getMonth()).padStart(2, "0"); 
        chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
        minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
    } 

    const formatted = (d_end) ? `${date}.${month}.${year} ${chas}:${minut} - ${date2}.${month2}.${year2} ${chas2}:${minut2}` : `${date}.${month}.${year} ${chas}:${minut}`;

    return (
        <div className={`box ${statusColor}`}>
            <div className="post__content">
                <div className="post_title">{props.post.title}</div>
                <div className="subscribe">
                    {formatted}
                </div>
                <div style={{fontSize: '14px'}}>
                    300.00 рублей х 10 часов = 3 000.00 руб.
                </div>

                {/* <ProjectWorkList workers={props.post.workers} defould={count}/>

                {
                    (props.post.workers.length && count !=0)
                    ? <p><span className="find_span">Найдено {count} из {props.post.workers.length - (props.post.workers.length - count2)}</span></p> 
                    : <p><span className="nofind_span"></span></p>
                } */}
                

            </div>
        </div>
    );
};

export default ProjectItem;