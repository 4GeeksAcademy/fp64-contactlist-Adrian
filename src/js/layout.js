import React, { act, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useActionData } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const ContactList = () => {
    const context = useContext(Context);
    const { store, actions } = context;
	const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    useEffect(() => {
        actions.updateContactList();
    },[]);
    return (
    <>
        <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />
        <button type="submit" onClick={
            (e) => {
                e.preventDefault();
                actions.addContactList({
                    name: name,
                    phone: phone,
                    email: email,
                    address: address
                });
				setName("");
				setPhone("");
				setEmail("");
				setAddress("");
				actions.updateContactList();
            }
        }>Add contact
        </button>
    <ul>
        {store.contacts.map((contact) => <li key={contact.id}>{contact.name}<button 
		onClick={(e)=>{
			e.preventDefault();
			actions.deleteContact(contact.id);
			actions.updateContactList();
			}}>Delete</button></li>)}
    </ul>
    </>);
}
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/demo" element={<Demo />} />
						<Route path="/single/:theid" element={<Single />} />
						<Route path="/contactList" element={<ContactList />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
