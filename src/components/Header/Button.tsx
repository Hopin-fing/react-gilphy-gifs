import React from 'react';

const Button: any = ({onClick ,children, disabled, classBtn}: any ) => {
    return (
        <button
            className={`btn ${classBtn}`}
            disabled={disabled}
            onClick={onClick}

        >{children}</button>
    )
};



export default Button;