import { useState, useEffect } from "react";
import { KJUR } from "jsrsasign";
import axios from "axios";
import creds from "../apikey.json";

const useDialogflow = query => {
	const [ret, setRet] = useState({ loading: false, response: null });

	useEffect(() => {
		if (query) {
			setRet({ loading: true, response: "..." });

			const token = GenerateToken();
			const SESSION_ID = "0";
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

				setRet({ loading: false, response: request.data.queryResult.fulfillmentText });
			};

			//Call request
			detectIntent(query);
		}
	}, [query]);

	return ret;
};

const GenerateToken = () => {
	const header = {
		alg: "RS256",
		typ: "JWT",
		kid: creds.private_key_id
	};

	const payload = {
		iss: creds.client_email,
		sub: creds.client_email,
		iat: KJUR.jws.IntDate.get("now"),
		exp: KJUR.jws.IntDate.get("now + 1hour"),
		aud: "https://dialogflow.googleapis.com/google.cloud.dialogflow.v2.Sessions"
	};

	const token = KJUR.jws.JWS.sign(
		"RS256",
		JSON.stringify(header),
		JSON.stringify(payload),
		creds.private_key
	);

	return token;
};

export default useDialogflow;
