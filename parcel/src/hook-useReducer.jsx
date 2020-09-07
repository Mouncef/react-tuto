import React, {useReducer} from 'react';
import { render } from 'react-dom';

function init(initialValue) {
    return {count: initialValue}
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + (action.payload || 1)}
        case 'decrement' :
            if(state.count <= 0) {
                return state
            }
            return  {count: state.count - 1}
        case 'reset':
            return init(0)
        default:
            throw new Error("L'action " + action.type + " est inconnue")
    }
}

function App() {
    const [count, dispatch] = useReducer(reducer, 0, init);
    return <div>
        Compteur : {JSON.stringify(count)}
        <button onClick={() => dispatch({type: 'increment'})}>Incrémenter</button>
        <button onClick={() => dispatch({type: 'increment', payload: 10})}>Incrémenter + 10</button>
        <button onClick={() => dispatch({type: 'decrement'})}>Dérémenter</button>
        <button onClick={() => dispatch({type: 'reset'})}>Réinitialiser</button>
        <Child/>
    </div>
}

function Child () {
    console.log('render')
    return <div>
        Hello
    </div>
}

render(
    <App />,
    document.getElementById('app')
);
