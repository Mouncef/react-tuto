import React, {useCallback, useContext, useMemo, useState} from 'react';
import { render, createPortal } from 'react-dom';

function Modal({ onClose }) {
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
                            <p>Modal body text goes here.</p>
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

    return (
        <div className="card" style={style}>
            <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </p>
                <button onClick={showModal} className="btn btn-primary">
                    Go somewhere
                </button>
            </div>
            {modal && <Modal onClose={hideModal} />}
        </div>
    )
}

render(
    <App />,
    document.getElementById('app')
);
