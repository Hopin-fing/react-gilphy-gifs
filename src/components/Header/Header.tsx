import React, {useContext,  useState} from 'react';
import Search from "./Search";
import Button from "./Button";
import {GiphyContext} from "../../context/giphy/giphyContex";

const Header: any = () => {
    const [warningEmptyTag, setWarningEmptyTag] = useState(false);
    const [warningManyTags, setWarningManyTags] = useState(false);
    const [value, setValue] = useState('');
    const [clear, setClearInput] = useState(false);
    const giphy = useContext(GiphyContext)




    const checkCoastTag = () => {
        const tag = value.trim()
        if(tag) {
            const splitTag = tag.split(',')
            if (4 > splitTag.length && splitTag.length >= 2){
                sendCustomTag(splitTag)
            }
            else if(4 < splitTag.length) {
                setWarningManyTags(true)
            } else {
                sendTag()
            }
            setWarningEmptyTag(false)
            setWarningManyTags(false)
        }else{
            setWarningManyTags(true)

        }


    }

    console.log(giphy.incorrectTags.length)

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
            <p>Привет! Введите теги для получения гифок (Для примера введите слово "cat" и нажмите загрузить).
                Допускаются теги, которые состоят только из латинских букв, также вы можете записывать составные теги через ",".
                Максимальное количество тегов в составном теге - 3 слова. Также при нажатии на кнопку "Группировать" вы распределите
                гифки по соответствующим категориям.
            </p>
            {giphy.incorrectTag
            ? <div className={'div-warning'}>Введенный тег не был найден (</div>
            : null}
            { giphy.incorrectTags.length > 0
                ? <div className={'div-warning'}>Перечисленные теги не были найдены: {giphy.incorrectTags.reduce((a, b) => {return a + ', ' + b }) }</div>
                : null}
            {warningManyTags
                ? <div className={'div-warning'}>Слишком большое количество тегов(</div>
                : null}
            {warningEmptyTag
                ? <div className={'div-warning'}>Заполните поле 'тег'</div>
                : null
            }
            <Search
                tagValue = {value}
                valueRequest={setValue}
                toggleClearValue={setClearInput}
                clearInput={clear}
            />
            <div className={'container-btn'}>
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
            >
                {!giphy.groupMode
                ? 'Группировать'
                : 'Разгруппировать'}
                </Button>
            </div>
        </div>
    )
}

export default Header;