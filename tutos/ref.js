const Field = React.forwardRef(function (props, ref) {
    return <div className="form-group">
        <input type="text" className="form-control" ref={ref} />
    </div>
})


class FieldC extends React.Component {
    render() {
        return  <div className="form-group">
            <label>{this.props.label}</label>
            <input type="text" className="form-control class" ref={this.props.forwardRef} />
            </div>
        ;
    }
}

const FieldWithRef = React.forwardRef((props, ref) => {
    return <FieldC forwardRef={ref} {...props} />
})

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    handleClick = (e) => {
        console.log(this.input.current.value)
    }

    render() {
        return <div>
            {/*<Field ref={this.input} />*/}
            <FieldWithRef ref={this.input} label="DEMO" />
            <button onClick={this.handleClick}>Tester</button>
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));