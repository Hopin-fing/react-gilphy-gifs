import React, {useContext, useState} from 'react';

export const Search : any = ({valueRequest, warning}: any) => {
    const [value, setValue] = useState('');


    const handlerValue : any = () => {
        valueRequest(value)
    }


    return(
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder="введите тег"
                value={value}
                onChange={event => setValue(event.target.value.replace(/[^A-Za-z +,]/ig, ''))}
                onKeyUp={handlerValue}
            />
            {warning
                ? <span>заполните поле 'тег'</span>
                : null
            }
        </div>
    )

};

export default Search;