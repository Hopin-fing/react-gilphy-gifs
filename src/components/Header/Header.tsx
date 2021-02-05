import React, {useContext,  useState} from 'react';
import Search from "./Search";
import Button from "./Button";
import {GiphyContext} from "../../context/giphy/giphyContex";

const Header: any = () => {
    const [warning, setWarning] = useState(false);
    const [value, setValue] = useState('');
    const [clear, setClearInput] = useState(false);
    const giphy = useContext(GiphyContext)




    const checkCoastTag = () => {
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

    const sendTag = () => {
        const correctValue = value.trim().toLowerCase()
        giphy.searchSimpleTag(correctValue)

    }

    const sendCustomTag  = (tag : Array<string>)  => {
        const correctTag = tag.map((item: any) =>
            item.trim().toLowerCase()
        )

        giphy.searchCustomTag(correctTag)

    }

    const handlerGroupMode = () => {
        giphy.setGroupMode()
    }

    const clearPage = () => {
        setValue('')
        setClearInput(true)
        giphy.clearImg()
    }


    return (
        <div className={'container pt-4'}>
            <p>Привет! Введите Введите теги для получения гифок (Для примера введите слово "cat" и нажмите загрузить).
                Допускаются теги, которые состоят только из латинских букв, также вы можете записывать составные теги через ",".
                Максимальное количество тегов в составном теге - 4 слова. Также при нажатии на кнопку "Группировать"
            </p>
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
                ? <Button
                    classBtn={'btn-secondary'}
                    disabled={true}
                >Загрузка...</Button>
                : <Button
                    classBtn={'btn-primary'}
                    onClick={checkCoastTag}
                >Загрузить</Button>
            }

            <Button
                classBtn={'btn-danger'}
                onClick={clearPage}
            >Очистить</Button>
            <Button
                classBtn={'btn-success'}
                onClick={handlerGroupMode}
            >Группировать</Button>
        </div>
    )
}

export default Header;