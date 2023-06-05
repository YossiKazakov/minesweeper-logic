import React, { useEffect, useState } from 'react'

function Timer() {

    const [secondsPassed, setSecondsPassed] = useState(0)
    const [timeToDisplay, setTimeToDisplay] = useState("0:00")
    
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsPassed(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const style = {
        width: 90,
        height: 65,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid pink',
        fontFamily: "Geologica",
        fontSize:'2rem',
        color:'pink'
    }

    useEffect(() => {
        const minuts = Math.floor(secondsPassed / 60)
        const seconds = secondsPassed % 60
        const formattedTime = seconds < 10 ? `${minuts}:0${seconds}` : `${minuts}:${seconds}`
        setTimeToDisplay(formattedTime)
    }, [secondsPassed])

    return (
        <div style={style}>{timeToDisplay}</div>
    )
}

export default Timer