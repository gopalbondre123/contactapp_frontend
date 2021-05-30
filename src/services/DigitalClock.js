import React, { useState } from 'react'

function DigitalClock() {
    let time=new Date().toLocaleTimeString();
    const [ctime,setCtime]=useState(time);

   const updateTime=()=>{
         time=new Date().toLocaleTimeString();
         setCtime(time);
    } 
    

    setInterval
    (updateTime,1000);

    return (
        <div style={{color:"white",height: "34px",
        fontSize: "23px",marginLeft:"800px"}}>
            
            {ctime}
        </div>
    )
}

export default DigitalClock
