import React from 'react';
// 1. Importing framer-motion
import { motion } from "framer-motion";
import "./Marquee.css";



const Marquee = ({width, workers, workerFam, workerName, phone, city, dateborn}) => {

  // 2. Defining Variants
  const marqueeVariants = {
    animate: {
      x: [width, -155],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
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
                        {workers.map((worker) => 
                              worker.spec
                        ).join(' | ')}      
                    </div>
                    : workerFam ?
                    <p className='fio-text'>{workerFam} {workerName} | {phone}</p>
                    : <p className='fio-text'>{city} | {dateborn}</p>
                    }
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;