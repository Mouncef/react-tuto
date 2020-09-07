import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function useIncrement(initial, step) {
    const [count, setCount] = React.useState(initial);
    const increment = () => {
        setCount(c => c + step)
    }
    return [count, increment]
}

function Compteur () {

    const [count, increment] = useIncrement(0, 2)

    return <>
        <button onClick={increment}>Incrémenter {count}</button>
        </>
}

ReactDOM.render(
    <div>
        <Compteur />
    </div>,
    document.getElementById('app')
);