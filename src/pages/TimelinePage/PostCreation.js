import React, { useState, useRef } from 'react';
import AutoResizingTextArea from '../../components/AutoResizingTextArea/AutoResizingTextArea';
import DeleteButton from '../../components/Delete-Button';
import blankPage from '../../assets/blank-page.png';

import { createPost } from '../../services/postServices';


const PostCreation = ({user, setPosts}) => {
	const fileInputRef = useRef(null);

	const [text, setText] = useState('');
	const [fileName, setFileName] = useState('');

	
	const handleChange = (event) => {
    	setText(event.target.value); // Update the value state
	};

	const handleDeleteFile = () => {
		setFileName(''); // Clear the fileName state

		// Reset the file input so the same file can be selected again
		if (fileInputRef.current) {
			fileInputRef.current.value = ''; // Reset the file input value
		}
	};

	const mediaButtonClicked = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		if ( event.target.files[0]) {
			const file = event.target.files[0]; // Access the selected file
			setFileName(file.name); // Update the file name state
		}
	}


	const onSumitButtonClicked = () => {
		const submit = async () => {
			if (!(text === '') || !(fileName === '')) {
				const response = await createPost({text: text, file: fileInputRef.current.files[0]});
				
				if (!response) {
					console.error('Failed to create post');
					alert('Something went wrong while creating the post.');
					return;
				}

				console.log(response);

				setPosts(prevPosts => [
					{
						id: response.id,
						text: text,
						file: response.file,
						fileType: response.fileType,
						firstName: user.firstName,
						lastName: user.lastName,
						photo: user.photo ? user.photo : 'https://via.placeholder.com/100'
					},
					...prevPosts
				]);

				if (fileInputRef.current) {
					fileInputRef.current.value = ''; // Reset the file input value
				}
				setText('');
				setFileName('');
				// refreshPosts();
			}
		}

		submit();
	};

    return (
        <div className="box-container post-container">
            <AutoResizingTextArea
                value={text}
                onChange={handleChange}
                placeholder="Δημιουργήστε ένα νέο άρθρο ..."
                onFocus={(event) => event.target.placeholder = ''}
                onBlur={(event) => event.target.placeholder = 'Δημιουργήστε ένα νέο άρθρο ...'}
            />
            {fileName ? <div className="filename-container"> 
                <img src={blankPage} alt= ''/> 
                <p> {fileName} </p> 
                <DeleteButton
                    label="X"
                    onClick={handleDeleteFile}
                /> 
            </div> : null}
            <div className="media-upload">
                <button className="custom-button" onClick={mediaButtonClicked}>
                    Πολυμέσα 
                </button>
                <input 
                    type="file" 
                    name="file" 
                    ref={fileInputRef} 
                    style={{ display:'none' }} 
                    onChange={handleFileChange}
                />
                <button className="custom-button" onClick={onSumitButtonClicked} > Δημιοσίευση </button>
            </div>
        </div>
    );
};

export default PostCreation;