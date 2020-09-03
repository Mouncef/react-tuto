function Field({name, value, onChange, children}) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
    </div>;
}

function Checkbox({name, value, onChange, children}) {
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input" />
        <label htmlFor={name} className="form-check-label">{children}</label>
    </div>;
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            newsletter: false,
            select: 'demo2',
            selectMultiple: ['demo1', 'demo3'],
            checked: true
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const type = e.target.type;
        const value = type === "checkbox" ? e.target.checked : e.target.value
        this.setState({
            [name] : value
        })
    }

    handleChangeSelect = (e) => {
        this.setState({
            select : e.target.value
        })
    }

    handleChangeSelectMultiple = (e) => {
        this.setState({
            selectMultiple : Array.from(e.target.selectedOptions).map(o => o.value)
        })
    }

    handleChangeCheckbox = (e) => {
        this.setState({checked: e.target.checked})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        console.log(data);
        this.setState({
            nom: '',
            prenom: '',
            newsletter: false,
            select: 'demo2',
            selectMultiple: ['demo1', 'demo3'],
            checked: true
        })
    }

    render() {
        return <div>
            <form className="container" onSubmit={this.handleSubmit}>
                <h2>Champs controllés </h2>
                <Field name="nom" value={this.state.nom} onChange={this.handleChange} >Nom</Field>
                <Field name="prenom" value={this.state.prenom} onChange={this.handleChange} >Prénom</Field>
                <Checkbox name="newsletter" value={this.state.newsletter} onChange={this.handleChange} >S'abonner à la newsletter</Checkbox>
                <div className="form-group">
                    <button className="btn btn-primary">Envoyer</button>

                </div>
            </form>
            <hr />
            <div>
                <label htmlFor="nom">Nom</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={this.state.nom}
                    onChange={this.handleChange}
                />
            </div>
            <div>
                <label htmlFor="prenom">Prenom</label>
                <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={this.state.prenom}
                    onChange={this.handleChange}
                />
            </div>
            <div>
                <label htmlFor="newsletter">S'abonner à la Newsletter ?</label>
                <input type="checkbox" id="newsletter" name="newsletter" checked={this.state.newsletter} onChange={this.handleChange} />
            </div>
            <hr />
            <h2>Champs non controllés </h2>
            <input type="text" />
            <br />
            <input type="text" value={undefined} />
            <br />
            <input type="text" defaultValue="salut !" />
            <hr />
            <br />
            <h2>Autres types</h2>
            <textarea
                type="text"
                id="nom"
                name="nom"
                value={this.state.nom}
                onChange={this.handleChange}
            />
            <br />
            <select value={this.state.select} onChange={this.handleChangeSelect}>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select>
            <br />
            <select value={this.state.selectMultiple} onChange={this.handleChangeSelectMultiple} multiple>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select>
            <br />
            <input type="checkbox" checked={this.state.checked} onChange={this.handleChangeCheckbox} />
            {this.state.checked ? <div>Un message qui s'affiche si on coche la checkbox</div> : null}
            <br />

        </div>
    }


}

ReactDOM.render(<Home />, document.getElementById('root'));