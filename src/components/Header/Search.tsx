import React, {useEffect, useState} from 'react';


export const Search = ({tagValue, valueRequest, clearInput, toggleClearValue} : any) => {
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
                onChange={event => setValue(event.target.value.replace(/[^A-Za-z +,ХЪ]/ig, ''))}
                onKeyUp={handlerValue}
            />

        </div>
    )

};

export default Search;