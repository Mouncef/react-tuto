const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mb-3">
            <div className="form-group mb-0">
                <input type="text" id="search" placeholder="Search" className="form-control" name="search" value={this.props.search} onChange={this.props.handleChange} />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" name="stock" id="stock" checked={this.props.stock} onChange={this.props.handleChange} />
                <label className="form-check-label" htmlFor="stock">Only show products in stock</label>
            </div>
        </div>;
    }
}

function ProductTable ({products, search, stock}) {
    const rows = [];
    let lastCategory = null

    products.forEach(product => {
        if ( (stock && !product.stocked) || (product.name.indexOf(search) === -1)) {
            return
        }
        if (product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(<ProductCategoryRow key={lastCategory} category={product.category} />)
        }
        rows.push(<ProductRow key={product.name} product={product} />)
    })

    return <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    ;
}

function ProductCategoryRow ({category}) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>;
}

function ProductRowComponent ({product}) {
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    console.log('render');
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>;
}

const ProductRow = React.memo(ProductRowComponent);

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            stock: false
        }
    }

    handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;
        const value = type === "checkbox" ? e.target.checked : e.target.value
        this.setState({ [name] : value} )
    }

    render() {
        return <React.Fragment>
            <SearchBar search={this.state.search} stock={this.state.stock} handleChange={this.handleChange} />
            <ProductTable products={this.props.products} search={this.state.search} stock={this.state.stock} />
        </React.Fragment>;
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('root'));