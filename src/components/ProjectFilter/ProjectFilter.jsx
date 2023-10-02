import React, {useMemo, useState} from 'react';
import './ProjectFilter.css';
import ButtonStatus from "../UI/ButtonStatus/ButtonStatus";
import SortSelect from "../UI/SortSelect/SortSelect";

const ProjectFilter = ({filter, setFilter, arr_status}) => {

    const [buttonPress, setButtonPress] = useState(false);

    arr_status.map((item, index) => {
                        if (item.title === 'Все') {
                            item.color = 'green';
                        } else if (item.title === 'Новые') {
                            item.color = 'blue';
                        } else if (item.title === 'Старые') {
                            item.color = 'yellow';
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
    const sortPost = (selectedSort) => {
        setFilter({...filter, sort: selectedSort})
        //selectedSort => setFilter({...filter, sort: selectedSort})
        //console.log(selectedSort)
    }


    return (
        <div>
            <div className='buttons_status'>

                {arr_status.map((item, index) =>
                    <ButtonStatus className={`btn-status ${item.color}-btn`} style={{borderColor: buttonPress ? '#fff' : ''}} onClick={onChangeFilter} key={index+1} value={item.title}>{item.title}</ButtonStatus>     
                )}
            </div>

            {/* <div style={{marginBottom: '15px'}}>
                <SortSelect 
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    disabled={false}
                    id="sort"
                    defaultValue="Сортировка"
                    options={[
                        {value: 'time_start', name: 'По дате мероприятия'},
                        {value: 'time_created', name: 'По дате создания'},
                    ]}
                /> 
            </div> */}
        </div>
    );
};

export default ProjectFilter;