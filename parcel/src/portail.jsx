import React, {useCallback, useContext, useMemo, useState} from 'react';
import { render } from 'react-dom';

const THEMES = {
    dark : { background: '#000', color: '#FFF', border: 'solid 1px #FFFF'},
    light : { background: '#FFF', color: '#000', border: 'solid 1px #000' },
}

const ThemeContext = React.createContext({
    theme: THEMES.dark,
    toggleTheme: () => {}
})

function App() {

    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(function () {
        setTheme(t => t === 'light' ? 'dark':'light')
    }, [])
    const value = useMemo(function () {
        return {
            theme : theme === 'light' ? THEMES.light : THEMES.dark,
            toggleTheme
        }
    }, [toggleTheme, theme])
    return <div>
        <ThemeContext.Provider value={value}>
            <Toolbar/>
            <ThemeSwitcher />
        </ThemeContext.Provider>
    </div>
}

function ThemeSwitcher() {
    const {toggleTheme} = useContext(ThemeContext)
    return <button onClick={toggleTheme}>Switch Thème</button>
}

function SearchForm() {
    return <div>
        <input />
        <ThemedButtonClass>Rechercher</ThemedButtonClass>
    </div>
}

function Toolbar() {
    return <div>
        <SearchForm  />
        <ThemeButton >M'inscrire</ThemeButton>
    </div>
}

function ThemeButton({children}) {
    const {theme} = useContext(ThemeContext)
    return <button style={theme}>{children}</button>

}

class ThemedButtonClass extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {children} = this.props
        const {theme} = this.context
        return <button style={theme}>{children}</button>
    }
}

ThemedButtonClass.contextType = ThemeContext;

render(
    <App />,
    document.getElementById('app')
);
