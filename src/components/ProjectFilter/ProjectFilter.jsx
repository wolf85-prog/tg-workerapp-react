import React, {useState} from 'react';
import './ProjectFilter.css';
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";
//import SortSelect from "../UI/SortSelect/SortSelect";

import newFilter from "../../image/buttons/blue_filter.png";
import oldFilter from "../../image/buttons/orange_filter.png";
import allFilter from "../../image/buttons/green_filter.png";

import btnFilter from "../../image/newspec/button_back.png";

const ProjectFilter = ({filter, setFilter, arr_status}) => {

    const [buttonPress, setButtonPress] = useState(false);

    arr_status.map((item, index) => {
                        if (item.title === 'Все') {
                            item.color = 'green';
                            item.back = allFilter;
                        } else if (item.title === 'Новые') {
                            item.color = 'blue';
                            item.back = newFilter;
                        } else if (item.title === 'Старые') {
                            item.color = 'yellow';
                            item.back = oldFilter;
                        } else if (item.title === 'Done') {
                            item.color = 'yellow';
                        } else if (item.title === 'Load') {
                            item.color = 'purple';
                        } else if (item.title === 'New') {
                            item.color = 'blue';
                        } else if (item.title === 'Wasted') {
                            item.color = 'red';
                        } else if (item.title === 'OnHold') {
                            item.color = 'brown';
                        } else {
                            item.color = '';
                        }
                    }
    )
    
    //filter.query
    const onChangeFilter = (e) => {
        e.preventDefault();
        
        //setFilter(e.target.value)
        setFilter({...filter, query: e.target.value})

        setButtonPress(true)
        console.log("Кнопка нажата: ", true)
    } 

    //filter.sort
    // const sortPost = (selectedSort) => {
    //     setFilter({...filter, sort: selectedSort})
    //     //selectedSort => setFilter({...filter, sort: selectedSort})
    //     //console.log(selectedSort)
    // }


    return (
        <div className='buttons_status'>
            {arr_status.map((item, index) =>
                    <ButtonStatus style={{backgroundImage: `url(${btnFilter})`}} className={`btn-status`} onClick={onChangeFilter} key={index+1} value={item.title}>{item.title}</ButtonStatus>  
            )}
        </div>
    );
};

export default ProjectFilter;