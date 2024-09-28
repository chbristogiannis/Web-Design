import React from "react";
import { getUsersDataXML } from "../../services/adminServices";

const XMLButton = ({selectedUsers}) => {

	const convertToXML = () => {
		const fetchXML = async () => {
			try {
				const xmlData = await getUsersDataXML(selectedUsers);

				// Check if xmlData is an XMLDocument, and serialize it if needed
				let xmlString;
				if (xmlData instanceof XMLDocument) {
					const serializer = new XMLSerializer();
					xmlString = serializer.serializeToString(xmlData);
				} else {
					xmlString = xmlData; // Assume it is already a string
				}

				// Create a Blob from the XML string
				const xmlBlob = new Blob([xmlString], { type: "application/xml" });

				// Create a temporary anchor element
				const downloadLink = document.createElement("a");

				// Create a URL for the blob
				const url = URL.createObjectURL(xmlBlob);
				downloadLink.href = url;

				// Set the download attribute with the desired file name
				downloadLink.download = "users_data.xml";

				// Programmatically click the link to trigger the download
				downloadLink.click();

				// Clean up the URL after download
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error('Error fetching XML data:', error);
			}
		};

		fetchXML();
	};


    return (
		<button onClick={() => convertToXML()} className='custom-button'>Export XML</button>
    );
};

export default XMLButton;