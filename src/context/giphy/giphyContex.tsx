import {createContext} from 'react'

interface IContextProps {
    searchSimpleTag: any,
    searchCustomTag: any,
    setGroupMode: any,
    state: any,
    clearImg: any,
    img: Array<string>,
    data: any,
    groupMode: boolean,
    incorrectTag: boolean,
    incorrectTags: Array<string>,
    loading: boolean
}

export const GiphyContext = createContext({} as IContextProps)