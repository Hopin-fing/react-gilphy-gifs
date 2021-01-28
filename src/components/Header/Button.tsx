import React from 'react';

const Button: any = ({onClick ,children, disabled}: any ) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}

        >{children}</button>
    )
};



export default Button;