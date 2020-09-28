import React, {useCallback, useContext, useMemo, useState} from 'react';
import { render, createPortal } from 'react-dom';
import PropTypes from 'prop-types';

function Modal({ onClose, children }) {
    return createPortal(
        <>
            <div
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                <span aria-hidden="true" onClick={onClose}>
                  &times;
                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>, document.body
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

Modal.defaultProps = {
    children: 'Bonjour'
}

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {error: false}
    }

    /**
     * Gérer l'affichage des erreurs sur l'interface
     * @param error
     * @returns {{error: boolean}}
     */
    static getDerivedStateFromError(error) {
        return {error: true}
    }

    /**
     * Afficher les erreurs en console
     * @param error
     * @param errorInfo
     */
    componentDidCatch(error, errorInfo) {
        console.warn(error, errorInfo);
    }

    render() {
        if (this.state.error) {
            return <div className="alert alert-danger">Il y a eu un problème</div>
        }
        return this.props.children
    }

}

function Double({n}) {
    return `Le double de ${n} est ${n + n}`;
}

Double.propTypes = {
    n: PropTypes.number.isRequired
}

function App() {
    const [modal, setModal] = useState(false);

    const showModal = function() {
        setModal(true);
    }

    const hideModal = function() {
        setModal(false);
    }

    const style = {
        transform: "translateY(1px)"
    }

    const log = function() {
        console.log('click')
    }

    return (
        <div className="card" style={style} onClick={log}>
            <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </p>
                <p>
                    <Double n={1} />
                </p>
                <button onClick={showModal} className="btn btn-primary">
                    Go somewhere
                </button>
            </div>
            <ErrorBoundary>
                {modal && <Modal onClose={hideModal} />}
            </ErrorBoundary>
        </div>
    )
}

render(
    <App />,
    document.getElementById('app')
);
