import React, { useState, useRef, useEffect } from 'react';
import classes from './NewSelect3.module.css';
import tringlDown from "../../../image/newspec/tringl_down.png"

import Vector from "../../../image/new/vector.svg"
import VectorUp from "../../../image/new/vector_up.svg"



const NewSelect3 = ({id, options, titleDate, setTitleDate, onChange, disabled}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [image, setImage] = useState([]);
    let arraySpec = []


    useEffect(() => {
        let handler = (e) => {
          if (!menuRef.current.contains(e.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      }, []);


    const menuRef = useRef();
    const myRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) {
           setOpen(!open);  
        }  
        myRef?.current?.scrollIntoView()
    };
    

    return (
        <div>
            {!open && (<div className={classes.dropdown}>
                <div className={classes.rec1}></div>
                <div className={classes.rec2}></div>
                <div className={classes.rec3}></div>
                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
                        >
                            <div className={classes.dropdownTitle}>
                                {/* {selected ? selected : ""} */}
                                {titleDate}
                            </div>
                            <img src={open ? VectorUp : Vector} className={'chevron-new'} alt='' style={{marginBottom: '5px'}}/>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {open && (<div className={classes.dropdownOpen}>
                <div className={classes.rec1Open}></div>
                <div className={classes.rec2Open}></div>
                <div className={classes.rec3Open}></div>
                <div className={classes.lineOpen}></div>
                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
                        >
                            <div className={classes.dropdownTitle}>
                                {/* {selected ? selected : ""} */}
                                {titleDate}
                            </div>
                            <img src={open ? VectorUp : Vector} className={'chevron-new'} alt='' style={{marginBottom: '5px'}}/>
                        </div>

                        <ul className={classes.listitem}>
                            {options.map((option, index) =>
                                <li 
                                    key={id + index} 
                                    value={option.id} 
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected(option.name);
                                            setTitleDate(option.name)
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> {option.name}
                                </li>
                            )}
                                {/* <li 
                                    value='0'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1970');
                                            setTitleDate('1970')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1970
                                </li>
                                <li 
                                    value='1'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1971');
                                            setTitleDate('1971')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1971
                                </li>
                                <li 
                                    value='2'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1972');
                                            setTitleDate('1972')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                    ref={myRef}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1972
                                </li>
                                <li 
                                    value='3'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1973');
                                            setTitleDate('1973')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1973
                                </li>
                                <li 
                                    value='4'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1974');
                                            setTitleDate('1974')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1974
                                </li> */}
                        </ul>

                    </div>
                </div>

            </div>)}

        </div>
    );
};

export default NewSelect3;