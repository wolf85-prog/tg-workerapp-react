import React, { useEffect, useRef, useState } from 'react';
import './RangeSlider.css'
import { useUsersContext } from "../../../contexts/UserContext";
import begunok from "../../../image/new/begunok.png"

const RangeSlider = ({min, max, value, step, stavka, setStavka}) => {
    const [systemIOS, setSystemIOS] = useState(false)
    const [sliderRange, setSliderRange] = useState(0)
    const [inputValue, setInputValue] = useState(value)
    const sliderRef = useRef(null)

    const [showNumber, setShowNumber] = useState(0)

    //const {setStavkaPlus} = useUsersContext();

    function handleSliderInput() {
        const range = max - min;
        const distance = sliderRef.current.value - min; //
        const percentage = (distance / range) * 100;

        setShowNumber(percentage)
        
        console.log("percentage: ", percentage)
        console.log("stavka: ", Number(stavka) + Number(distance))
        if (percentage === 0) {
            setStavka(percentage)  
        } else {
            let sum = Number(stavka) + Number(distance)
            setStavka(sum)
        }

        setSliderRange(percentage)
        setInputValue(sliderRef.current.value)
    }

    function handleSliderInput2() {
        const range = max - min;
        const distance = value - min;
        const percentage = (distance / range) * 100;
        setShowNumber(percentage)
        setSliderRange(percentage)

        setInputValue(value) //установить ползунок на исходное место
        
        setStavka(stavka) //установка суммы в исходное состояние
    }

    useEffect(() => {
        handleSliderInput();
    }, [sliderRef])

    /**
     * Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     *
     * @returns {String}
     */
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }

    useEffect(()=> {
        if (getMobileOperatingSystem() ==="iOS") {
            setSystemIOS(true)
        } else {
            setSystemIOS(false) 
        }
        
    },[])

    return (
        <div className='range-slider'>
                <div className="shkala">
                    <div className='blocks'>
                        <div className={`block1 ${showNumber > 13 && showNumber < 30 && `block-active`}`} style={{left: `${20+2}%`}}>1</div>
                        <div className={`block1 ${showNumber > 30 && showNumber < 50 && `block-active`}`} style={{left: `${21*2+1}%`}}>2</div>
                        <div className={`block1 ${showNumber > 50 && showNumber < 70 && `block-active`}`} style={{left: `${21*3+1}%`}}>3</div>
                        <div className={`block1 ${showNumber > 70 && showNumber < 90 && `block-active`}`} style={{left: `${21*4+1}%`}}>4</div>
                        <div className={`block1 ${showNumber > 90 && showNumber < 1000 && `block-active`}`} style={{left: `${21*5+1}%`}}>5</div>
                    </div>

                    <div className='shkala01' style={{left: `${-5}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+18.8}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+18.8*2}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+18.8*3}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+18.8*4}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                </div>

            <div className='slider-container'>
                <div className='shkala2'></div> 

                <div className='slider-thumb' style={{ left: `calc(${sliderRange}% - 7.3em)` }}>
                    <img className='begun' src={begunok} alt='' style={{display: 'block'}}/>
                </div> 
                <input 
                    type="range" 
                    value={inputValue}
                    onChange={handleSliderInput}
                    className={systemIOS ? 'slider2' : 'slider'}
                    min={min}
                    max={max}
                    ref={sliderRef}
                    step={step}
                    style={{
                        border: 'none', 
                        marginTop: '-40px', 
                        zIndex: '15',
                    }}
                    onMouseUp={()=>handleSliderInput2()} 
                    onTouchEnd={()=>handleSliderInput2()} 
                />

                
                
                <div 
                    className='progress'
                    style={{ width: `${sliderRange}%` }}
                ></div>

                
            </div>
        </div>
    );
};

export default RangeSlider;