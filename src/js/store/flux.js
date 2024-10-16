const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getContactsList: async () => {
				const store = getStore();
				const agendaSlug = 'ezebellino'; 
				
				try {
					let resp = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json", 
						}
					});
			
					if (resp.status === 404) {
						console.log("La agenda no existe. Creando nueva agenda...");
						
						let createAgendaResp = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							}
						});
			
						if (createAgendaResp.ok) {
							console.log("Agenda creada con éxito");
							resp = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
								method: "GET",
								headers: {
									"Content-Type": "application/json",
								}
							});
						} else {
							console.error("Error al crear la agenda");
							return;
						}
					}
			
					if (resp.ok) {
						let dataContacts = await resp.json();
						console.log({ dataContacts });
						setStore({ contacts: dataContacts.contacts });
					} else {
						console.error("Error al obtener los contactos");
					}
				} catch (error) {
					console.error("Error en la petición:", error);
				}
			},
			
			createNewContact: async ({ name, email, address, phone }) => {
				const newContact = {
					name: name, 
					email: email,
					agenda_slug: 'ezebellino', 
					address: address,
					phone: phone
				};
			
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/ezebellino/contacts', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(newContact)
					});
			
					if (response.ok) {
						const addedContact = await response.json();
						const store = getStore();
						setStore({ contacts: [...store.contacts, addedContact] });
						console.log("Contacto agregado:", addedContact);
					} else {
						console.error("Error al agregar el contacto");
					}
				} catch (error) {
					console.error("Error:", error);
				}
			},
			

			handleDelete: async (contactId) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/ezebellino/contacts/${contactId}`, {
						method: 'DELETE',
					});

					if (response.ok) {
						const store = getStore();
						setStore({ contacts: store.contacts.filter(contact => contact.id !== contactId) });
						console.log("Contacto eliminado");
					} else {
						console.error("Error al eliminar el contacto");
					}
				} catch (error) {
					console.error("Error:", error);
				}
			},
			editContact: async (contactId, updatedContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/ezebellino/contacts/${contactId}`, {
						method: 'PUT', 
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updatedContact) 
					});
			
					if (!response.ok) {
						throw new Error("Failed to update the contact");
					}
			
					const updatedContactData = await response.json();
					const store = getStore();
					setStore({
						contacts: store.contacts.map(contact =>
							contact.id === contactId ? updatedContactData : contact
						)
					});
					console.log("Contacto actualizado", updatedContactData);
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			}			
			
		},
	};
};

export default getState;
