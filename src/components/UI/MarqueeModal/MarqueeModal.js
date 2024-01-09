import React, {useEffect} from 'react';
// 1. Importing framer-motion
import { motion } from "framer-motion";
import "./MarqueeModal.css";
import { useUsersContext } from "../../../contexts/UserContext";


const MarqueeModal = ({width, workers}) => {

  const {setWidthStr, setStr} = useUsersContext();


  useEffect(() => {

    let str = workers?.slice(0).reverse().map((worker) =>
        worker.spec
    ).join(' | ')
    setStr(str)
    console.log("str1: ", workers)
    
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    ctx.font = "14px Arial";        
    let widthX = Math.round(ctx.measureText(str).width);

    setWidthStr(widthX)


  }, [workers])

  // 2. Defining Variants
  const marqueeVariants = {
    animate: {
     // x: [25,  0 - Math.abs(width) - 25],
      x: [25,  -25 ],
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
                    <div style={{display: 'flex'}}>
                        {workers.slice(0).reverse().map((worker) => 
                              worker.spec
                        ).join(' | ')}      
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MarqueeModal;