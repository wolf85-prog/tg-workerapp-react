import { React, useEffect, useState, useRef } from 'react'
import './Calendar.css'
import statusData from "./../../data/statusData";

export default function Calendar({openProject, setHeight, projects, showSidebar, setShowSidebar, setShowProject, setShowCalendar, setShowCalendar2}) {

    const DAYS_OF_THE_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const manthList = [
        { value: 'Январь', label: 'Январь' },
        { value: 'Февраль', label: 'Февраль' },
        { value: 'Март', label: 'Март' },
        { value: 'Апрель', label: 'Апрель' },
        { value: 'Май', label: 'Май' },
        { value: 'Июнь', label: 'Июнь' },
        { value: 'Июль', label: 'Июль' },
        { value: 'Август', label: 'Август' },
        { value: 'Сентябрь', label: 'Сентябрь' },
        { value: 'Октябрь', label: 'Октябрь' },
        { value: 'Ноябрь', label: 'Ноябрь' },
        { value: 'Декабрь', label: 'Декабрь' },
    ]

    // Will be implemented below
    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    //const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
    const [currentDays, setCurrentDays] = useState([]);

    const [project, setProject] = useState([])
    const [statusProject, setStatusProjec] = useState([])

    const ref = useRef(null)

    useEffect(() => {
        console.log(ref.current.clientHeight)
        setHeight(ref.current.clientHeight + 93)
    })

    useEffect(() => {
        console.log("projects: ", projects)

        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        //setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getUTCDay();
        
        let arr = []
        let arr2 = []
        let arrStatus = []
        let arrProject = []
        let countDay = 35
        if (weekdayOfFirstDay > 5 ) {
            countDay = 42
        } else {
            countDay = 35
        }
        // for (let day = 0; day < countDay; day++) {
        //     projects.map((item)=> {
        //         if ('2025-06-01' === item?.dateStart.split('T')[0]) {
        //             //arrProject.push(item)
        //             //console.log(item?.dateStart.split('T')[0])
        //         } else {
        //             //arrProject.push({})
        //             //console.log("...")
        //         }          
        //     })  
        //     arrProject.push(projects[0])
        //     console.log("arrProject: ", arrProject)
        // }

        for (let day = 0; day < countDay; day++) {
            if (day === 0 && weekdayOfFirstDay === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
                console.log("0")
            } else if (day === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
                console.log("1")
            } else {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
                console.log("2")
            }
        
            let calendarDay = {
                currentMonth: (firstDayOfMonth.getMonth() === date.getMonth()),
                date: (new Date(firstDayOfMonth)),
                month: firstDayOfMonth.getMonth(),
                number: firstDayOfMonth.getDate(),
                selected: (firstDayOfMonth.toDateString() === date.toDateString()),
                year: firstDayOfMonth.getFullYear()
            }

            const dateCalendar = firstDayOfMonth.getFullYear() + "-" + String(firstDayOfMonth.getMonth()+1).padStart(2, "0") + "-" + String(firstDayOfMonth.getDate()).padStart(2, "0")



            if (dateCalendar === projects[0]?.dateStart.split('T')[0]) {
                 arr2.push(projects[0])
                const status = statusData.find(item2 => item2.label === projects[0].status)
                arrStatus.push(status)
            } else {
                //arr2.push({})
                //arrStatus.push({})
            }

            if (dateCalendar === projects[1]?.dateStart.split('T')[0]) {
                 arr2.push(projects[1])
                const status = statusData.find(item2 => item2.label === projects[1].status)
                arrStatus.push(status)
            } else {
                //arr2.push({})
                //arrStatus.push({})
            }

            console.log("arrStatus: ", arrStatus)   
            
            setProject(arr2)
            setStatusProjec(arrStatus)
        
            arr.push(calendarDay);
            setCurrentDays(arr)
            //console.log(firstDayOfMonth.getFullYear() + "-" + String(arr[0].month+1).padStart(2, "0") + "-" + String(arr[0].number).padStart(2, "0") )
        }
    }, [date, projects]);
//----------------------------------------------------------------------
    // function getStartDayOfMonth(date) {
    //     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // }

    // function isLeapYear(year) {
    //     return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    // }

    //const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;


    const nextMonth = () => {
        setDate(new Date(year, month + 1, day))
    }

    const prevMonth = () => {
        setDate(new Date(year, month - 1, day))
    }


    const changeMonth = (selectedOption) => {
        console.log(manthList.findIndex(el => el.value === selectedOption.value)); 
        let index = manthList.findIndex(el => el.value === selectedOption.value)
        setDate(new Date(year, index, day))
    }

    
  return (
    <div className='frame'  ref={ref}>

        <div className='body-table'>
            {DAYS_OF_THE_WEEK.map(d => (
                <div className='day-header label-calendar' key={d}>
                    {d}
                </div>
            ))}
            {
                currentDays.map((day, index) => {
                    return (
                        <div key={index} className='day' style={{marginBottom: '20px', border: day.month !== new Date().getMonth() ? '1px solid #474646' : ''  }}>
                            <strong>
                                <p className='date-day'>
                                    {String(day.number).padStart(2, "0") + '.'+ String(day.month+1).padStart(2, "0")}
                                </p>
                            </strong>

                            {project[index] && Object.keys(project[index]).length !== 0 ? 
                                <div className='viewProject' onClick={()=>openProject(index)} style={{borderColor: statusProject[index] ? statusProject[index].color : ''}}>
                                    <strong>
                                        <p className='date-proj-day' style={{color: statusProject[index] ? statusProject[index].color : ''}}>
                                            {String(day.number).padStart(2, "0") + '.'+ String(day.month+1).padStart(2, "0")}
                                        </p>
                                    </strong>
                                </div>
                             : <></>
                            }

                        </div>
                    )
                })
            }
        </div>

    </div>
  );
}