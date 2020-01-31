import React, { useEffect, useState } from "react";
import axios from "axios";
import { KJUR } from "jsrsasign";
import creds from "../apikey.json";

const Chat = () => {
	const [state, setState] = useState("HI");

	useEffect(() => {
		//

		//Setup Auth

		//

		const header = {
			alg: "RS256",
			typ: "JWT",
			kid: creds.private_key_id
		};

		// Payload
		const payload = {
			iss: creds.client_email,
			sub: creds.client_email,
			iat: KJUR.jws.IntDate.get("now"),
			exp: KJUR.jws.IntDate.get("now + 1hour"),
			aud: "https://dialogflow.googleapis.com/google.cloud.dialogflow.v2.Sessions"
		};

		const stringHeader = JSON.stringify(header);
		const stringPayload = JSON.stringify(payload);
		const token = KJUR.jws.JWS.sign("RS256", stringHeader, stringPayload, creds.private_key);

		//////////////////////////

		//Request to dialogflow

		/////////////////////////

		const SESSION_ID = "111";
		const URL = `https://dialogflow.googleapis.com/v2/projects/${creds.project_id}/agent/sessions/${SESSION_ID}:detectIntent`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json"
			}
		};

		//Async request
		const detectIntent = async text => {
			const Body = {
				queryInput: { text: { text, languageCode: "en" } }
			};

			const request = await axios.post(URL, Body, config);
			setState(request.data.queryResult.fulfillmentText);
		};

		//Call request
		detectIntent("Tell me a joke");
	}, []);

	return <p>{state}</p>;
};

export default Chat;
