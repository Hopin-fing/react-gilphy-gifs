import {createContext} from 'react'

interface IContextProps {
    search: any,
    setGroupMode: any,
    state: any,
    clearImg: any,
    img: any,
    data: any,
    groupMode: boolean,
    loading: boolean
}

export const GiphyContext = createContext({} as IContextProps)