import React from 'react';
// 1. Importing framer-motion
import { motion } from "framer-motion";
import "./Marquee.css";



const Marquee = ({width, workers, workerFam, workerName, phone, city, dateborn}) => {

  // 2. Defining Variants
  const marqueeVariants = {
    animate: {
      x: [25, width-55],
      transition: {
        x: {
          repeat: 0,
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