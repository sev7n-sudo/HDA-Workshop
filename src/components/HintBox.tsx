import React from 'react';

const HintBox: React.FC<{ message?: string; hint?: string }> = ({ message, hint }) => {
    return (
        <div className="hint-box">
            <p>{message || hint}</p>
        </div>
    );
};

export default HintBox;