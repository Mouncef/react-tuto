import React, { useState, useEffect } from 'react';
import ReactDOM , { render } from 'react-dom';
import '@babel/polyfill'

function useIncrement(initial = 0, step = 1) {
    const [count, setCount] = useState(initial)
    const increment = () => {
        setCount( c => c + step )
    }
    return [count, increment]
}

function useAutoIncrement(initial = 0, step = 1) {
    const [count, increment] = useIncrement(initial, step);

    useEffect(function () {
        const timer = window.setInterval(function () {
            increment();
        }, 1000);

        return function () {
            clearInterval(timer)
        };
    }, [])

    return count
}

function useToggle (initialValue = true) {
    const [compteurVisible, setCompteurVisible] = useState(initialValue);
    const toggleCompteur = () => {
        setCompteurVisible( v => !v )
    }

    return [compteurVisible, toggleCompteur]
}

function useFetch(url) {
    const [state, setState] = useState({
        items: [],
        loading: true
    })

    useEffect(function () {
        (async function() {
            const response = await fetch(url);
            const responseData = await response.json();
            if (response.ok) {
                setState({
                    items : responseData,
                    loading : false
                })
            } else {
                alert(JSON.stringify(responseData));
                setState(s => ({...s, loading: false}))
            }
        })()

    }, [])
    return [state.loading, state.items]
}

function Compteur () {
    const [count, increment] = useIncrement(10);
    const count2 = useAutoIncrement(10);

    return <>
        <button onClick={increment}>{count}</button>
        <button>Auto increment{count2}</button>
    </>
}

function PostTable () {
    const [loading, items] = useFetch("https://jsonplaceholder.typicode.com/comments?_limit=10");

    if (loading) {
        return 'Chargement...'
    }

    return <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Content</th>
        </tr>
        </thead>
        <tbody>
        { items.map(
            (post, key) => <tr key={key}>
                <td>{post.name}</td>
                <td>{post.email}</td>
                <td>{post.body}</td>
            </tr>)
        }
        </tbody>
    </table>
}

function TodoList () {
    const [loading, items] = useFetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

    if (loading) {
        return 'Chargement...'
    }

    return <ul>
        { items.map( (td, k) => <li key={k}>{td.title}</li> ) }
    </ul>
}

function App () {

    const [compteurVisible, toggleCompteur] = useToggle();

    return <div>
        Afficher le compteur
        <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible} />
        <br />
        {compteurVisible && <Compteur/>}
        <TodoList />
        <PostTable />
    </div>
}

render(
    <App />,
    document.getElementById('app')
);
