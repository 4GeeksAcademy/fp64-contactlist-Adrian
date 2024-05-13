import contactOperationDispatcher from "./contactOperationDispatcher";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "Este es el contacto 1",
					background: "white",
					initial: "white"
				},
				{
					title: "Este es el contacto 2",
					background: "white",
					initial: "white"
				}
			],
			contacts: [
				{
					"contacts": [
					  {
						name: "contact1",
						phone: "2",
						email: "2",
						address: "2",
						id: 3
					  }
					]
				  }
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			updateContactList: async () => {
				const {contacts} = await contactOperationDispatcher.get();
				const store = getStore();
				setStore({...store, contacts})
			},
			addContactList : async (data) => {
				await contactOperationDispatcher.post(data);
			},
			deleteContact : async (id) => {
				await contactOperationDispatcher.delete(id);
			}
		}
	};
};

export default getState;
