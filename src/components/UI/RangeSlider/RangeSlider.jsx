import React, { useEffect, useRef, useState } from 'react';
import './RangeSlider.css'

import begunok from "../../../image/new/begunok.png"

const RangeSlider = ({min, max, value, step}) => {
    const [sliderRange, setSliderRange] = useState(0)
    const [inputValue, setInputValue] = useState(0)
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
        const distance = 30 - min;
        const percentage = (distance / range) * 100;

        setSliderRange(30)
        setInputValue(30)
        console.log("sfsdfsdf")
    }

    // useEffect(() => {
    //     handleSliderInput();
    // }, [sliderRef])

    return (
        <div className='range-slider'>
                <div className="shkala">
                    <div className='blocks'>
                        <div className="block1">1</div>
                        <div className="block2">2</div>
                        <div className="block3">3</div>
                        <div className="block4">4</div>
                        <div className="block5">5</div>
                    </div>

                    <div className='shkala01' style={{left: `${-8}px`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-8+55}px`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-8+55*2}px`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-8+55*3}px`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>
                    <div className='shkala01' style={{left: `${-8+55*4}px`}}>
                        <div className='shk-line11'></div>
                        <div className='shk-line12'></div>
                        <div className='shk-line13'></div>
                        <div className='shk-line15'></div>
                    </div>

                    {/* <div className='shkala2'></div>  
                    <div className='shkala3'></div>  */}

                </div>
            <div className='slider-container'>
            
                

                <input 
                    type="range" 
                    value={inputValue}
                    onChange={handleSliderInput}
                    className='slider'
                    min={min}
                    max={max}
                    ref={sliderRef}
                    step={step}
                    style={{border: 'none', marginTop: '-40px'}}
                    onMouseUp={()=>handleSliderInput2()} 
                    onTouchEnd={()=>handleSliderInput2()} 
                />

                
                
                <div 
                    className='slider-thumb'
                    style={{ left: `calc(${sliderRange}% - 0.5em)` }}
                >
                    <img className='begun' src={begunok} alt='' />
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