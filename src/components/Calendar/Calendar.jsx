import { React, useEffect, useState, useRef } from 'react'
import './Calendar.css'

export default function Calendar({openProject, setHeight, showSidebar, setShowSidebar, setShowProject, setShowCalendar, setShowCalendar2}) {

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
    const [showButtonAdd, setShowButtonAdd] = useState([])

    const [project, setProject] = useState([])
    const [project2, setProject2] = useState([])
    const [showProject2, setShowProject2] = useState([])

    const ref = useRef(null)

    useEffect(() => {
        console.log(ref.current.clientHeight)
        setHeight(ref.current.clientHeight + 93)
    })

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        //setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getUTCDay();
        
        let arr = []
        let countDay = 35
        if (weekdayOfFirstDay > 5 ) {
            countDay = 42
        } else {
            countDay = 35
        }
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
        
            arr.push(calendarDay);
            setCurrentDays(arr)
            //console.log(currentDays)
        }
    }, [date]);
//----------------------------------------------------------------------
    // function getStartDayOfMonth(date) {
    //     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // }

    // function isLeapYear(year) {
    //     return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    // }

    //const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

    const overDay = (index) => {
        let arr = []
        arr[index] = true
        setShowButtonAdd(arr)
    }

    const outDay = (index) => {
        let arr = []
        arr[index] = false
        setShowButtonAdd(arr)
    }

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

    const addNewProject = (item) => {
        let arr = [...project]
        arr[item] = true
        setProject(arr)
        //setShowButtonAdd[item](false)

        console.log("+")
    }
    

    const addNewProject2 = (item) => {
        let arr = [...project]
        arr[item] = true
        setProject2(arr)
        
        let arr2 = [...showProject2]
        arr2[item] = true
        setShowProject2(arr2)
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
                        <div key={index} className='day' style={{marginBottom: showProject2[index] ? '120px' : '20px', border: day.month !== new Date().getMonth() ? '1px solid #474646' : ''  }}>
                            <strong>
                                <p className='date-day' style={{color: project[index] ? '#1555f5' : (day.month !== new Date().getMonth() ? '#474646' : '')}}>
                                    {String(day.number).padStart(2, "0") + '.'+ String(day.month+1).padStart(2, "0")}
                                </p>
                            </strong>

                            {project[index] ? 
                                <div className='viewProject' onClick={()=>openProject(index)}>
                                    <p style={{fontSize: '16px', marginBottom: '3px'}}>Проект</p>   
                                    <p className='viewStatus'>Новый</p>

                                    <p className='time-project' style={{color: project[index] ? '#1555f5' : ''}}>09:00</p>
                                </div>
                             : <></>
                            }

                            {project2[index] ? 
                                <div className='viewProject' style={{position: 'absolute', top: '108px'}}>
                                    <p style={{fontSize: '16px', marginBottom: '3px'}}>Проект</p>
                                    {/* <p style={{fontSize: '14px', marginBottom: '3px', color: '#777777'}}>Компания</p> */}
                                    <p className='viewStatus'>Новый</p>

                                    <p className='time-project' style={{color: project[index] ? '#1555f5' : ''}}>09:00</p>
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