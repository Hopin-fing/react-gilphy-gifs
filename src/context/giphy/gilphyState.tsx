import React, {useReducer} from 'react';
import {GilphyContext} from './gilphyContex';
import axios from "axios";
import { gilphyReducer } from './gilphyReducer';
import {SEARCH_TAGS} from "../types";


const API_KEY : any = process.env.REACT_APP_API_KEY;


const GilphyState = ({children} : any) => {
    const initialState : any  = {
        img: {},
        loading: false
    };

    const [state, dispatch] = useReducer(gilphyReducer, initialState);


    const search = async (tag : any)   => {
        console.log('hi')

        const response = await axios.get(
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}}C&tag=${tag}`
        )
        console.log(response)

        dispatch({
            type: SEARCH_TAGS,
            payload: response.data.items
        })
    }

    const {img, loading} = state
    return (
        <GilphyContext.Provider value={{search, img, loading}}>
            {children}
        </GilphyContext.Provider>
    )
    }
;

export default GilphyState;