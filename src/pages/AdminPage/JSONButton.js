import React from "react";
import { getUsersDataJSON } from "../../services/adminServices";

const JSONButton = ({ selectedUsers }) => {
	const exportToJSON = () => {
		const fetchJSON = async () => {
			try {
				const data = await getUsersDataJSON(selectedUsers);

				// Create a Blob from the JSON data
				const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

				// Create a temporary anchor element
				const downloadLink = document.createElement("a");

				// Create a URL for the blob
				const url = URL.createObjectURL(jsonBlob);
				downloadLink.href = url;

				// Set the download attribute with the desired file name
				downloadLink.download = "users_data.json";

				// Programmatically click the link to trigger the download
				downloadLink.click();

				// Clean up the URL after download
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error(error);
			}
		};

		fetchJSON();
	};

    return (
		<button onClick={() => exportToJSON()} className='custom-button'>Export JSON</button>
    );
};

export default JSONButton;