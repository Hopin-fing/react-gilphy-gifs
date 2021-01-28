import React, {useReducer} from 'react';
import {GiphyContext} from './giphyContex';
import axios from "axios";
import { giphyReducer } from './giphyReducer';
import {CLEAR_IMG, SEARCH_TAGS, SET_GROUP_MODE, SET_LOADING} from "../types";


const API_KEY : any = process.env.REACT_APP_API_KEY;


const GiphyState = ({children} : any) => {
    const initialState : any  = {
        data: {},
        img: [],
        groupMode: false,
        loading: false
    };

    const [state, dispatch] = useReducer(giphyReducer, initialState);


    const search = async (tag : any)   => {

        setLoading()

        const response = await axios.get(
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}&rating=r`
        )

        const data = response.data.data;
        const image_url = data['image_url']
        const newResponse = {
            tag,
            image_url
        };

        dispatch({
            type: SEARCH_TAGS,
            payload: newResponse
        })
    }


    const setGroupMode = () => dispatch({type:SET_GROUP_MODE})
    const setLoading = () => dispatch({type:SET_LOADING})

    const clearImg = ()  => dispatch({type: CLEAR_IMG})


    const {data, img, groupMode, loading} = state
    return (
        <GiphyContext.Provider value={{search, setGroupMode, clearImg, state, data, groupMode, img, loading}}>
            {children}
        </GiphyContext.Provider>
    )
    }
;

export default GiphyState;