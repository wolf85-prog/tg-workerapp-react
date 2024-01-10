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
    };

    useEffect(() => {
        console.log(open)
        if (open) {
            console.log("sdfsdf")
            myRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                })
        } 
    }, [open])
    

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
                            {/* {options.map((option, index) =>
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
                            )} */}
                            {/* <li ref={myRef} className={classes.listyle}></li> */}
                                <li 
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
                                </li>
                                <li 
                                    value='5'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1975');
                                            setTitleDate('1975')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1975
                                </li>
                                <li 
                                    value='6'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1976');
                                            setTitleDate('1976')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1976
                                </li>
                                <li 
                                    value='7'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1977');
                                            setTitleDate('1977')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1977
                                </li>
                                <li 
                                    value='8'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1978');
                                            setTitleDate('1978')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1978
                                </li>
                                <li 
                                    value='9'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1979');
                                            setTitleDate('1979')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1979
                                </li>
                                <li 
                                    value='10'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1980');
                                            setTitleDate('1980')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                    ref={myRef}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1980
                                </li>
                                <li 
                                    value='11'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1981');
                                            setTitleDate('1981')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1981
                                </li>
                                <li 
                                    value='12'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1982');
                                            setTitleDate('1982')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1982
                                </li>
                                <li 
                                    value='13'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1983');
                                            setTitleDate('1983')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1983
                                </li>
                                <li 
                                    value='14'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1984');
                                            setTitleDate('1984')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1984
                                </li>
                                <li 
                                    value='15'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1985');
                                            setTitleDate('1985')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1985
                                </li>
                                <li 
                                    value='16'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1986');
                                            setTitleDate('1986')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1986
                                </li>
                                <li 
                                    value='17'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1987');
                                            setTitleDate('1987')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1987
                                </li>
                                <li 
                                    value='18'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1988');
                                            setTitleDate('1988')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1988
                                </li>
                                <li 
                                    value='19'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1989');
                                            setTitleDate('1989')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1989
                                </li>
                                <li 
                                    value='20'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1990');
                                            setTitleDate('1990')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1990
                                </li>
                                <li 
                                    value='21'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1991');
                                            setTitleDate('1991')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1991
                                </li>
                                <li 
                                    value='22'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1992');
                                            setTitleDate('1992')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1992
                                </li>
                                <li 
                                    value='23'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1993');
                                            setTitleDate('1993')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1993
                                </li>
                                <li 
                                    value='24'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1994');
                                            setTitleDate('1994')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1994
                                </li>
                                <li 
                                    value='25'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1995');
                                            setTitleDate('1995')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1995
                                </li>
                                <li 
                                    value='26'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1996');
                                            setTitleDate('1996')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1996
                                </li>
                                <li 
                                    value='27'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1997');
                                            setTitleDate('1997')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1997
                                </li>
                                <li 
                                    value='28'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1998');
                                            setTitleDate('1998')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1998
                                </li>
                                <li 
                                    value='29'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('1999');
                                            setTitleDate('1999')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 1999
                                </li>
                                <li 
                                    value='30'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2000');
                                            setTitleDate('2000')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                    ref={myRef}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2000
                                </li>
                                <li 
                                    value='31'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2001');
                                            setTitleDate('2001')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2001
                                </li>
                                <li 
                                    value='32'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2002');
                                            setTitleDate('2002')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2002
                                </li>
                                <li 
                                    value='33'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2003');
                                            setTitleDate('2003')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2003
                                </li>
                                <li 
                                    value='34'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2004');
                                            setTitleDate('2004')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2004
                                </li>
                                <li 
                                    value='35'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2005');
                                            setTitleDate('2005')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2005
                                </li>
                                <li 
                                    value='36'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2006');
                                            setTitleDate('2006')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2006
                                </li>
                                <li 
                                    value='37'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2007');
                                            setTitleDate('2007')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2007
                                </li>
                                <li 
                                    value='38'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2008');
                                            setTitleDate('2008')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2008
                                </li>
                                <li 
                                    value='39'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2009');
                                            setTitleDate('2009')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2009
                                </li>
                                <li 
                                    value='40'
                                    onClick={(e)=> {
                                            onChange(e)
                                            setSelected('2010');
                                            setTitleDate('2010')
                                            setOpen(false); 
                                        }
                                    }
                                    className={classes.listyle}
                                >
                                   <p style={{fontSize: '5px', marginRight: '10px'}}>&#x25CF;</p> 2010
                                </li>

                        </ul>

                    </div>
                </div>

            </div>)}

        </div>
    );
};

export default NewSelect3;