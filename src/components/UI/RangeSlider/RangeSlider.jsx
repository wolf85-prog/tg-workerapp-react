import React, { useEffect, useRef, useState } from 'react';
import './RangeSlider.css'

import begunok from "../../../image/new/begunok.png"

const RangeSlider = ({min, max, value, step}) => {
    const [sliderRange, setSliderRange] = useState(value)
    const [inputValue, setInputValue] = useState(value)
    const sliderRef = useRef(null)

    function handleSliderInput() {
        const range = max - min;
        const distance = sliderRef.current.value - min;
        const percentage = (distance / range) * 100;

        setSliderRange(percentage)
        setInputValue(sliderRef.current.value)
    }

    function handleSliderInput2() {
        const range = max - min;
        const distance = value - min;
        const percentage = (distance / range) * 100;

        setSliderRange(value)
        setInputValue(value)
    }

    useEffect(() => {
        handleSliderInput();
    }, [sliderRef])

    return (
        <div className='range-slider'>
                <div className="shkala">
                    <div className='blocks'>
                        <div className="block1" style={{left: `${20+2}%`}}>1</div>
                        <div className="block1" style={{left: `${20*2}%`}}>2</div>
                        <div className="block1" style={{left: `${20*3}%`}}>3</div>
                        <div className="block1" style={{left: `${20*4}%`}}>4</div>
                        <div className="block1" style={{left: `${20*5}%`}}>5</div>
                    </div>

                    <div className='shkala01' style={{left: `${-5}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+17.5}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+17.5*2}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+17.5*3}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-5+17.5*4}%`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                </div>

            <div className='slider-container'>
                <div className='shkala2'></div>  
                <input 
                    type="range" 
                    value={inputValue}
                    onChange={handleSliderInput}
                    className='slider'
                    min={min}
                    max={max}
                    ref={sliderRef}
                    step={step}
                    style={{border: 'none', marginTop: '-40px', zIndex: '15'}}
                    onMouseUp={()=>handleSliderInput2()} 
                    onTouchEnd={()=>handleSliderInput2()} 
                />

                
                <div 
                    className='slider-thumb'
                    style={{ left: `calc(${sliderRange}% - 0.5em)` }}
                >
                    <img className='begun' src={begunok} alt='' style={{display: 'block'}}/>
                </div>
                <div 
                    className='progress'
                    style={{ width: `${sliderRange}%` }}
                ></div>

                
            </div>
        </div>
    );
};

export default RangeSlider;