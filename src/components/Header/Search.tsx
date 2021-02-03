import React, {useEffect, useState} from 'react';

export const Search : any = ({tagValue, valueRequest, clearInput, toggleClearValue,   warning}: any) => {
    const [value, setValue] = useState(tagValue);


    const handlerValue : any = () => {
        valueRequest(value)

    }



        useEffect(() => {
            setValue('')
            toggleClearValue(false)
    }, [clearInput, toggleClearValue])





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