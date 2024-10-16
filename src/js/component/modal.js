import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

export const Modal = (props) => {
    return (
        <>
            {props.showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Eliminar Contacto</h5>
                                <button type="button" className="close close-btn" aria-label="Close" onClick={props.handlerClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={props.handlerClose}>
                                    Oh no!
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={props.handlerDelete}>
                                    Yes Baby!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handlerClose: PropTypes.func.isRequired,
    handlerDelete: PropTypes.func.isRequired,
};

