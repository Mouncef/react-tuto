const scales = {
    c: 'Celsius',
    f: 'Farhenheit'
}

function BoilingVerdict({celsius}) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau bout</div>
    } else {
        return <div className="alert alert-info">L'eau ne bout pas</div>
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function tryConvert(temperature, convert) {
    const value = parseFloat(temperature);
    if (Number.isNaN(value)) {
        return '';
    }
    return (Math.round(convert(value) * 100) / 100).toString();

}

function Button({type, children}) {
    const className = 'btn btn-' + type
    return <button className={className}>{children}</button>
}

function PrimaryButton({children}) {
    return <Button type="primary">{children}</Button>
}

function SecondaryButton({children}) {
    return <Button type="secondary">{children}</Button>
}

function Column2({left, right}) {
    return <div className="row">
        <div className="col-md-6">{left}</div>
        <div className="col-md-6">{right}</div>
    </div>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const name = 'scale' + this.props.scale;
        const scaleName = scales[this.props.scale];
        return <div className="form-group">
                <label htmlFor={name}>Température (en {scaleName})</label>
                <input type="number" id={name} name={name} value={this.props.temperature} onChange={this.handleChange} className="form-control" />
            </div>;
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 'c',
            temperature: 20
        }
    }

    handleCelsiusChange = (temperature) => {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFarhenheitChange = (temperature) => {
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render() {
        const {temperature, scale} = this.state;
        const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius);
        const fahrenheit = scale === "f" ? temperature : tryConvert(temperature, toFahrenheit);
        return <div>
            <Column2
                left={<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />}
                right={<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFarhenheitChange} />}
            />
            <BoilingVerdict celsius={celsius} />
            <SecondaryButton type="primary">Envoyer</SecondaryButton>
        </div>
        ;
    }
}


ReactDOM.render(<Calculator />, document.getElementById('root'));
