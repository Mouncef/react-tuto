import React, {useCallback, useContext, useMemo, useState} from 'react';
import { render } from 'react-dom';

const FormContext= React.createContext({});

function FormWithContext({defaultValue, onSubmit, children}) {

    const [data, setData] = useState(defaultValue);
    const change = useCallback(function (name, value) {
        setData(d => ({...d, [name]:value}))
    }, [])
    const value = useMemo(function() {
        return {...data,change}
    }, [data, change])
    const handleSubmit = useCallback(function (e) {
        e.preventDefault()
        onSubmit(value)
    }, [onSubmit, value])

    return <FormContext.Provider value={value}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
        {JSON.stringify(value)}
    </FormContext.Provider>
}

function FormField({name, children}) {
    const data = useContext(FormContext)
    const handleChange = useCallback(function(e) {
        data.change(e.target.name, e.target.value)
    }, [data.change])
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" className="form-control" id={name} name={name} value={data[name] || ''} onChange={handleChange} />
    </div>
}

function PrimaryButton({children}) {

    return <button className="btn btn-primary">{children}</button>
}

function App() {

    const handleSubmit = useCallback(function (value) {
        console.log(value)
    }, [])

    return <FormWithContext defaultValue={{name: 'Doe', firstname: 'John'}} onSubmit={handleSubmit} >
        <FormField name="firstname">Prénom</FormField>
        <FormField name="name">Nom</FormField>
        <PrimaryButton>Envoyer</PrimaryButton>
    </FormWithContext>
}

render(
    <App />,
    document.getElementById('app')
);
