import React, {useState, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
// import '@babel/polyfill'
function wait(duration) {
    const t = Date.now()
    while(true) {
        if (Date.now() - t > duration) {
            return true
        }
    }
}

function encode(number) {
    wait(1000);
    return Date.now()
}

const Button = React.memo(function ({onClick}) {
    console.log('render')
    return <button onClick={onClick}>Mon bouton</button>
})

function App2() {
    const [count, setCount] = useState(0)

    const handleClick = useCallback(function() {
            alert('Bonjour ' + count)
    }, [count])

    return <div>
        <Button onClick={handleClick}/>
        <button onClick={() => setCount(c => c +1)}>Incrémenter {count}</button>
    </div>
}

function App() {
    const [name, setName] = useState('John')
    const [number, setNumber] = useState(0)

    const onChange = function (e) {
        if (e.target.getAttribute('name') === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'number') {
            setNumber(e.target.value)
        }
    }

    const encoded = useMemo(function () {
        return encode(number)
    }, [number]);

    return <div>
        <div className="form-group">
            <label htmlFor="name"></label>
            <input name="name" id="name" type="text" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="number"></label>
            <input name="number" id="number" type="number" value={number} onChange={onChange} />
        </div>
        <h2>Encoded</h2>
        {encoded}
    </div>
}

render(
    <div><App /><App2 /></div>,
    document.getElementById('app')
);
