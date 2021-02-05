import React, {useEffect, useState} from 'react';

// type SearchProps = {
//     tagValue: string | number | readonly string[] | undefined,
//     valueRequest: void,
//     clearInput: any,
//     toggleClearValue: any,
//     warning: any,
//
//
// }

export const Search = ({tagValue, valueRequest, clearInput, toggleClearValue, warning} : any) => {
    const [value, setValue] = useState(tagValue);

    console.log(typeof valueRequest)


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