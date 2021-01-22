import React, {useContext, useState} from 'react';
import Search from "./Search";
import Button from "./Button";
import {GiphyContext} from "../../context/giphy/giphyContex";

const Header: any = () => {
    const [warning, setWarning] = useState(false);
    const [value, setValue] = useState('');
    const giphy = useContext(GiphyContext)



    const sendTag : any = () => {
        if(value.trim()) {
            giphy.search(value)
            setWarning(false)
        }else{
            console.log(value)
            setWarning(true)
        }
    }


    // const takeValueRequest:any = (valueRequest : any = null) => {
    //
    //
    // }



    return (
        <div>
            <Search
                valueRequest={setValue}
                warning={warning}
            />
            <Button
                onClick={sendTag}
            >Загрузить</Button>
            <Button
                // onClick={sendTag}
            >Очистить</Button>
            <Button
                // onClick={sendTag}
            >Группировать</Button>
        </div>
    )
}

export default Header;