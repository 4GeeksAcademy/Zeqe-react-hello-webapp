import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
        if (contactToEdit) {
            setContact(contactToEdit);
        }
    }, [store.contacts, id]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.editContact(id, contact);
        navigate("/"); 
    };

    return (
        <div className="container">
            <h1>Editar Contacto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};
