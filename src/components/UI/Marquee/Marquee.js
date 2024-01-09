import React, {useEffect, useState} from 'react';
// 1. Importing framer-motion
import { motion } from "framer-motion";
import "./Marquee.css";
import { useUsersContext } from "./../../../contexts/UserContext";


const Marquee = ({width, workers, workerFam, workerName, phone, city, dateborn}) => {

  const {setWidthStr, setStr} = useUsersContext();

  const [coord, setCoord] = useState(45)

  useEffect(() => {

    let str = workers.slice(0).reverse().map((worker) =>
        worker.spec
    ).join(' | ')
    setStr(str)
    console.log("str1: ", workers)
    
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    ctx.font = "14px Arial";        
    let widthX = Math.round(ctx.measureText(str).width);

    setWidthStr(widthX)
    console.log("widthX1: ", 0 - Math.abs(width) - 45)


  }, [workers])

  // 2. Defining Variants
  const marqueeVariants = {
    animate: {
     // x: [25,  0 - Math.abs(width) - 25],
      x: [50,  0 - Math.abs(width) - 50 ],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          ease: "linear",
          repeatDelay: 3,
        },
      },
    },
  };
  
    return (
        <div>
            <div className="marquee">
                {/* 3. Using framer motion */}
                <motion.div
                    className="track"
                    variants={marqueeVariants}
                    animate="animate"
                >
                    {workers ? 
                    <div style={{display: 'flex'}}>
                        {workers.slice(0).reverse().map((worker) => 
                              worker.spec
                        ).join(' | ')}      
                    </div>
                    : workerFam ?
                    <p>{workerFam} {workerName} | {phone}</p>
                    : <p>{city} | {dateborn}</p>
                    }
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;