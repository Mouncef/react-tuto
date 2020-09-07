import React, { useState, useEffect } from 'react';
import ReactDOM , { render } from 'react-dom';
import './index.css';

function useIncrement(initial, step) {
    const [count, setCount] = useState(initial);
    const increment = () => {
        setCount(c => c + step)
    }
    return [count, increment]
}

function Compteur () {

    const [count, increment] = useIncrement(0, 2)

    useEffect(() => {
        const timer = window.setInterval(() => {
            increment()
        }, 1000)

        return function() {
            clearInterval(timer);
        }

    }, [])

    useEffect(() => {
        document.title = "Compteur " + count
    }, [count])

    return <>
        <button onClick={increment}>Incrémenter {count}</button>
    </>
}

render(
    <div>
        <Compteur />
    </div>,
    document.getElementById('app')
);
