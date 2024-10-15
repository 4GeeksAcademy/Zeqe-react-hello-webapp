const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getContactsList: async () => {
				const store = getStore();
				const agendaSlug = 'ezebellino'; // Tu agenda de usuario
				
				try {
					// Petición para obtener la lista de contactos
					let resp = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json", // Asegúrate que esté bien escrito
						}
					});
			
					// Si la respuesta es 404, la agenda no existe, entonces la creamos
					if (resp.status === 404) {
						console.log("La agenda no existe. Creando nueva agenda...");
						
						// Crear la agenda
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
			
					// Si la respuesta es exitosa, actualizamos los contactos en el store
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
			
			handleSubmit: async (e) => {
				e.preventDefault();

				const store = getStore(); // Obtén el store para trabajar con él
				const { fullName, email, address, phone } = store; // Asegúrate de que estas propiedades existan en el store o vengan del formulario

				const newContact = {
					name: fullName, 
					email: email,
					agenda_slug: 'ezebellino', 
					address: address,
					phone: phone
				};

				try {
					const response = await fetch('https://playground.4geeks.com/contact/ezebellino/contact', {
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
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/ezebellino/${contactId}`, {
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
			}
		},
	};
};

export default getState;
