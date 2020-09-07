import React, {useRef} from 'react';
import { render } from 'react-dom';

function App() {

    const input = useRef(null);
    const compteur = useRef({count: 0})
    const handleButtonClick = function () {
        compteur.current.count++
        console.log(compteur)
    }

    return <div>
        <div className="form-group">
            <label htmlFor="name"></label>
            <input name="name" id="name" type="text" ref={input} />
        </div>
        <button onClick={handleButtonClick}>Récupérer la valeur</button>
    </div>
}

render(
    <App />,
    document.getElementById('app')
);
