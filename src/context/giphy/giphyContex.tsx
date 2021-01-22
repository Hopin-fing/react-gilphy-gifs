import {createContext} from 'react'

interface IContextProps {
    search: any,
    img: string,
    loading: boolean
}

export const GiphyContext = createContext({} as IContextProps)