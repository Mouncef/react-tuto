function WelcomeFunc({name, children}) {
    console.log(children);
    return <div>
        <h1>Bonjour {name}</h1>
        <p>
            {children}
        </p>
    </div>
}

class Welcome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>
                {this.props.children}
            </p>
        </div>
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount() {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    tick () {
        this.setState({date: new Date()})
    }

    render() {
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>;
    }
}

class Incrementer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            n : props.start,
            timer : null
        }
        this.method = this.method.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.play()
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer);
    }

    play() {
        window.clearInterval(this.state.timer);
        this.setState({
            timer:  setInterval(this.increment.bind(this), 1000)
        })
    }

    pause() {
        window.clearInterval(this.state.timer);
        this.setState({
            timer: null
        })
    }

    increment() {
        this.setState( (state, props) => ({n: state.n + props.step}))
    }

    method() {
        return this.state.timer ? this.pause() : this.play()
    }

    label() {
        return this.state.timer ? "Pause" : "Play"
    }

    reset() {
        this.pause()
        this.play()
        this.setState((state, props) => ({ n: props.start }))
    }

    render() {
        console.log('render');
        return <div>
            nombre : {this.state.n}
            <button onClick={this.method}>{this.label()}</button>
            <button onClick={this.reset}>Réinitialiser</button>
        </div>;
    }

}

Incrementer.defaultProps = {
    start : 0,
    step : 1
}

class ManualIncrementer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {n: 0}
    }

    increment(e) {
        e.preventDefault();
        this.setState((state, props) => ({ n: state.n + 1}))
    }

    render() {
        return <div>
            Valeur {this.state.n} <a href="https://google.fr" onClick={this.increment.bind(this)}>Incrémenter</a>
        </div>;
    }
}

function Home() {
    return <div>
        <Welcome name="Dorothée" />
        <Welcome name="Jean" />
        <Clock />
        <Incrementer start={10} />
        <Incrementer start={100} step={10} />
        <ManualIncrementer />
    </div>
}

ReactDOM.render(<Home />, document.getElementById('root'));