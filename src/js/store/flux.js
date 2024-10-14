const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [
				{
					"name": "José",
					"phone": "2245506251",
					"email": "JoseConti@hotmail.com",
					"address": "SiempreViva 123",
					"id": 57
				},
				{
					"name": "Juan",
					"phone": "2245506221",
					"email": "JuanConti@hotmail.com",
					"address": "SiempreViva 323",
					"id": 58
				},
				{
					"name": "María",
					"phone": "2245506333",
					"email": "MariaConti@hotmail.com",
					"address": "SiempreViva 333",
					"id": 59
				}
			]
		},
		actions: {

			getContactsList: async () => {
				let resp = await fetch("https://playground.4geeks.com/contact/agendas/ezebellino/contacts", {
					method: "GET",
					headers: {
						"Content-Type": "aplication/json",
					}
				});

				if (resp.status === 404) {
					console.log("Agenda creada con éxito!")
					await fetch("https://playground.4geeks.com/contact/agendas/ezebellino", {
						method: "POST",
						headers: {
							"Content-Type": "aplication/json",
						}
					});
				}


				if (resp.ok) {
					let dataContacts = await resp.json();
					console.log({ dataContacts })
					setStore({ contacts: dataContacts.contacts })
				}

			},

			createNewContact: async ({ fullName, phone, email, address }) => {
				let resp = await fetch("https://playground.4geeks.com/contact/agendas/ezebellino/contacts", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: fullName,
						phone: phone,
						email: email,
						address: address
					})
				});
				if (resp === 422) {
					console.error("Error:", errorData.error || "Unknown server error");
				}
				if (resp.ok) {
					const dataContacts = await resp.json();
					console.log({ dataContacts });
					setStore({ contacts: dataContacts.contacts });
				}
			},

			updateContact: async (contactId, fullName, phone, email, address) => {
				let resp = await fetch(`https://playground.4geeks.com/contact/agendas/ezebellino/contacts/${contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: fullName,
						phone: phone,
						email: email,
						address: address
					})
				});
				if (resp === 422) {
					console.error("Error:", errorData.error || "Unknown server error");
				}
				if (resp === 200) {
					const dataContacts = await resp.json();
					console.log({ dataContacts });
					setStore({ contacts: dataContacts.contacts });
				}
			},
			deleteContact: async (id) => {
				let resp = await fetch(`https://playground.4geeks.com/contact/agendas/ezebellino/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					}
				});
				if (resp.status === 404) {
					console.log("No se ha podido eliminar el contacto")
				}
				if (resp.status === 200) {
					let data = await resp.json();
					console.log({ data });
					setStore({ contacts: data });
				}
			},
		},
	}
}
export default getState;