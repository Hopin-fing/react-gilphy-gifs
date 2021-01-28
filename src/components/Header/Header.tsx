import React, {useContext, useState} from 'react';
import Search from "./Search";
import Button from "./Button";
import {GiphyContext} from "../../context/giphy/giphyContex";

const Header: any = () => {
    const [warning, setWarning] = useState(false);
    const [value, setValue] = useState('');
    const giphy = useContext(GiphyContext)




    const sendTag : any = () => {
        if(value.trim().toLowerCase()) {
            const correctValue = value.trim().toLowerCase()
            giphy.search(correctValue)
            setWarning(false)
        }else{
            setWarning(true)
        }
    }

    const handlerGroupMode : any = () => {
        giphy.setGroupMode()
    }

    const clearPage : any = () => {
        giphy.clearImg()
    }


    return (
        <div>
            <Search
                valueRequest={setValue}
                warning={warning}
            />

            {giphy.loading
                ? <Button disabled={true}
                >Загрузка...</Button>
                : <Button
                    onClick={sendTag}
                >Загрузить</Button>
            }

            <Button
                onClick={clearPage}
            >Очистить</Button>
            <Button
                onClick={handlerGroupMode}
            >Группировать</Button>
        </div>
    )
}

export default Header;