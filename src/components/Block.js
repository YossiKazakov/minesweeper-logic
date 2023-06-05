import React from 'react'

export default React.memo(function Block({ details, flagSelf, revealSelfAndSurroundings }) {
    const { value, flagged, revealed, X, Y } = details

    const style = {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid grey',
        fontFamily: "Geologica",
        background: chexPattern(X, Y, value, revealed),
        color: numColorCode(value)
    }

    const displayBlock = () => {
        if (!revealed) {
            if (flagged) {
                return <>🚩</>
            }
            return <>❔</>
        }
        return value === "X" ? <>💣</> : value === 0 ? "" : value

    }

    return (
        <div style={style}
            onClick={() => revealSelfAndSurroundings(X, Y)}
            onContextMenu={(e) => !revealed ? flagSelf(e, X, Y) : e.preventDefault()}
        >
            {displayBlock()}
        </div>
    )
})



const chexPattern = (x, y, value, revealed) => {
    if (value === 0 && revealed) {
        return "#E0E0E0"
    }
    if (x % 2 === 0 && y % 2 === 0) {
        return "#B8B8B8";
    } else if (x % 2 === 0 && y % 2 !== 0) {
        return "#C0C0C0";
    } else if (x % 2 !== 0 && y % 2 === 0) {
        return "#C8C8C8";
    } else {
        return "#D3D3D3";
    }
};

const numColorCode = (num) => {
    if (num === 1) {
        return "#1976d2";
    } else if (num === 2) {
        return "#388d3c";
    } else if (num === 3) {
        return "#d33030";
    } else if (num === 4) {
        return "#7c21a2";
    } else if (num === 5) {
        return "#1976d2";
    } else if (num === 6) {
        return "#1976d2";
    } else {
        return "white";
    }
}