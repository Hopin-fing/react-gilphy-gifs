import React, {useContext,  useState} from 'react';
import Search from "./Search";
import Button from "./Button";
import {GiphyContext} from "../../context/giphy/giphyContex";

const Header: any = () => {
    const [warning, setWarning] = useState(false);
    const [value, setValue] = useState('');
    const [clear, setClearInput] = useState(false);
    const giphy = useContext(GiphyContext)




    const checkCoastTag : any = () => {
        const tag = value.trim()
        if(tag) {
            const splitTag = tag.split(',')

            if (splitTag.length >= 2) {
                sendCustomTag(splitTag)
            } else {
                sendTag()
            }
            setWarning(false)
        }else{
            setWarning(true)
        }


    }

    const sendTag : any = () => {
        const correctValue = value.trim().toLowerCase()
        giphy.searchSimpleTag(correctValue)

    }

    const sendCustomTag : any = (tag : any)  => {
        const correctTag = tag.map((item: any) =>
            item.trim().toLowerCase()
        )

        giphy.searchCustomTag(correctTag)

        // if(value.trim().toLowerCase()) {
        //     giphy.search(correctValue)
        //     setWarning(false)
        // }else{
        //     setWarning(true)
        // }
    }

    const handlerGroupMode : any = () => {
        giphy.setGroupMode()
    }

    const clearPage : any = () => {
        setValue('')
        setClearInput(true)
        giphy.clearImg()
    }


    return (
        <div>
            {giphy.incorrectTag
            ? <h3>Введенный тег не был найден (</h3>
            : null}
            <Search
                tagValue = {value}
                valueRequest={setValue}
                toggleClearValue={setClearInput}
                clearInput={clear}
                warning={warning}
            />

            {giphy.loading
                ? <Button disabled={true}
                >Загрузка...</Button>
                : <Button
                    onClick={checkCoastTag}
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