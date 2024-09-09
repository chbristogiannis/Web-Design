import React, { useRef } from 'react';
import './AutoResizingTextArea.css';

const AutoResizingTextArea = ({ value, onChange, placeholder, ...props }) => {
    const textAreaRef = useRef(null);

    const handleChange = (event) => {
        // Update the height to auto to recalculate scrollHeight
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }

        // Call the onChange function passed via props
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <textarea
            ref={textAreaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={1}
            className='auto-resizing-textarea'
            {...props}  // Spread the remaining props like className, id, etc.
        />
    );
};

export default AutoResizingTextArea;
