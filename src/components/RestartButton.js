import React, { useState } from 'react'

function RestartButton({ restart }) {

    const [buttonStyles, setButtonStyles] = useState({
        width: 70,
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid grey',
        fontFamily: "Geologica",
        fontSize: '2.5rem',
        background: '#ccc',
        cursor: 'pointer',
        padding: '10px 20px'
    })

    const [buttonText, setButtonText] = useState(<>😋</>)

    const onMouseEnterHandle = () => {
        setButtonStyles({ ...buttonStyles, background: 'pink' })
        setButtonText(<>😍</>)
    }

    const onMouseLeaveHandle = () => {
        setButtonStyles({ ...buttonStyles, background: '#ccc' })
        setButtonText(<>😋</>)
    }


    return (
        <button
            style={buttonStyles}
            onMouseEnter={onMouseEnterHandle}
            onMouseLeave={onMouseLeaveHandle}
            onClick={restart}
        >
            {buttonText}
        </button>
    )
}

export default RestartButton