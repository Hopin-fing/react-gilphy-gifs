import React from 'react';

const Button: any = ({onClick ,children}: any ) => {
    return (
        <button
            onClick={onClick}
        >{children}</button>
    )
};



export default Button;