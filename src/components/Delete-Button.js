import React, { useState } from 'react';
import '../styles/Buttons.css'; // Import your custom CSS

const DeleteButton = ({ label, onClick }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(true);
        if (onClick) {
            onClick();
        }

        setTimeout(() => {
            setIsPressed(false);
        }, 100);
    };

    return (
        <button
            className={`delete-button ${isPressed ? 'active' : ''}`}
            onClick={handleClick}
        >
        {label}
        </button>
    );
};

export default DeleteButton;
