import React, { useState, useRef, useEffect } from 'react';
import classes from './NewSelect2.module.css';
import tringlDown from "../../../image/newspec/tringl_down.png"

import specData from "../../../data/specData"

import Sound from "../../../image/layers/icons/SOUND.png";
import Riggers from "../../../image/layers/icons/RIGGERS.png";
import Production from "../../../image/layers/icons/PRODUCTION.png"
import StageGround from "../../../image/layers/icons/STAGEGROUND.png";
import Video from "../../../image/layers/icons/VIDEO.png";
import Light from "../../../image/layers/icons/LIGHT.png";
import Stagehands from "../../../image/layers/icons/STAGEHANDS.png";
import Trucks from "../../../image/layers/icons/TRUCKS.png";
import Catering from "../../../image/layers/icons/CATERING.png";
import Photo from "../../../image/layers/icons/PHOTO.png";
import Party from "../../../image/layers/icons/PARTY.png";
import Games from "../../../image/layers/icons/GAMES.png";

import Marker from "../../../image/icons/marker.png";


const NewSelect2 = ({id, options, titleSpec, setTitleSpec, onChange, disabled}) => {

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

    useEffect(()=> {
        console.log("titleSpec: ", titleSpec)
        //options.map((item)=>{
            specData.map((item, index)=> {
                //item.models.map((model)=> {
                    //if (model.name === item.name) {
                        let image
                        let name
                        if (item.icon === 'Sound') {
                            image = Sound;
                        } else if (item.icon === 'Riggers') {
                            image = Riggers;
                        } else if (item.icon === 'Production') {
                            image = Production;
                        } else if (item.icon === 'Stage Ground') {
                            image = StageGround;
                        } else if (item.icon === 'Video') {
                            image = Video;
                        } else if (item.icon === 'Light') {
                            image = Light;
                        } else if (item.icon === 'Stagehands') {
                            image = Stagehands;
                        } else if (item.icon === 'Trucks') {
                            image = Trucks;
                        } else if (item.icon === 'Catering') {
                            image = Catering;
                        } else if (item.icon === 'Photo') {
                            image = Photo;
                        } else if (item.icon === 'Party') {
                            image = Party;
                        } else if (item.icon === 'Games') {
                            image = Games;
                        }


                        const newObj = {
                            icon: image,
                            name: item.name
                        }
                        arraySpec.push(newObj)
                    //}
                //})
            })
            //console.log(arraySpec)
            setImage(arraySpec)
        //})
    },[specData])

    const menuRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        if (!disabled) {
           setOpen(!open); 
        }
        
    };

    return (
        <div>
            <div className={classes.dropdown}>
                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
                        >
                            <div className={classes.dropdownTitle}>
                                {titleSpec}
                            </div>
                            <img src={tringlDown} className={'chevron-new'} alt=''/>
                        </div>
                    </div>
                    {open && (
                        <ul className={classes.listitem}>
                        {options.map((option, index) =>
                            <li 
                                key={id + index} 
                                value={option.id} 
                                onClick={(e)=> {
                                        onChange(e)
                                        //setSelected(option.name);
                                        setTitleSpec(option.name)
                                        setOpen(false);
                                    }
                                }
                                className={classes.listyle}
                            >
                                {/* <div style={{display: 'flex', alignItems: 'center'}}> */}
                                    <img src={Marker} width={20} style={{ marginRight: '15px'}} /> 
                                    {option.name}
                                <img className={option.icon ? classes.imageCat : ""} src={option.icon ? image[index].icon : ""} alt=""/>
                            </li>
                        )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewSelect2;