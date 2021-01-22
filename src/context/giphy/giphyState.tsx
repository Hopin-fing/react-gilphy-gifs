import React, {useReducer} from 'react';
import {GiphyContext} from './giphyContex';
import axios from "axios";
import { giphyReducer } from './giphyReducer';
import {SEARCH_TAGS} from "../types";


const API_KEY : any = process.env.REACT_APP_API_KEY;


const GiphyState = ({children} : any) => {
    const initialState : any  = {
        tags: [],
        loading: false
    };

    const [state, dispatch] = useReducer(giphyReducer, initialState);


    const search = async (tag : any)   => {

        const response = await axios.get(
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}&rating=r`
        )

        const data = response.data.data;
        const image_url = data['image_url']
        const newResponse = {
            tag,
            image_url
        };
        console.log(state)



        dispatch({
            type: SEARCH_TAGS,
            payload: newResponse
        })
    }

    const {img, loading} = state
    return (
        <GiphyContext.Provider value={{search, img, loading}}>
            {children}
        </GiphyContext.Provider>
    )
    }
;

export default GiphyState;