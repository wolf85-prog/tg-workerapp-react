import React from 'react';
// 1. Importing framer-motion
import { motion } from "framer-motion";
import "./Marquee.css";



const Marquee = ({width, workers, workerFam, workerName, phone, city, dateborn}) => {

  // 2. Defining Variants
  const marqueeVariants = {
    animate: {
     // x: [25,  0 - Math.abs(width) - 25],
      x: [45,  0 - Math.abs(width) - 85 ],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
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