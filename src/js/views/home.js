import React from "react";
import "../../styles/home.css";
import { ButtonContact } from "../component/buttonContact";
import { ContactCard } from "../component/contactCard";




export const Home = () => {
	return (
	<div className="container mt-5">
		<ButtonContact className="me-5"/> 
		<ContactCard/>
	</div>
)};