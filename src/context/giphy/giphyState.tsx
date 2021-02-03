import React, {useReducer} from 'react';
import {GiphyContext} from './giphyContex';
import axios from "axios";
import { giphyReducer } from './giphyReducer';
import {CLEAR_IMG, SEARCH_CUSTOM_TAGS, SEARCH_SIMPLE_TAGS, SET_GROUP_MODE, SET_LOADING, TAG_NOT_FOUND} from "../types";


const API_KEY : any = process.env.REACT_APP_API_KEY;


const GiphyState = ({children} : any) => {
    const initialState : any  = {
        data: {},
        img: [],
        groupMode: false,
        incorrectTag: false,
        loading: false
    };

    const [state, dispatch] = useReducer(giphyReducer, initialState);
    const tagExist = (response : any, type : any, payload : any ) => {
        if (Object.keys(response).length) {

            dispatch({
                type: type,
                payload: payload
            })
        } else {

            dispatch({
                type: TAG_NOT_FOUND,
            })
        }
    }

    const searchSimpleTag = async (tag : any)   => {
        setLoading()

        const response = await axios
            .get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}&rating=r`)
            .then(res => res.data.data)
            .catch(e => console.error(e))


        const imageUrl = response['image_url']
        const newResponse = {
            tag,
            'image_url' : imageUrl
        };


        tagExist(response, SEARCH_SIMPLE_TAGS, newResponse)



    }

    const searchCustomTag = async (tag : any)   => {
        setLoading()

        const  responseArr : any = tag.map( (item : any) => {
            return axios
                .get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${item}&rating=r`)
                .then(res => res.data.data['image_url'])
        })

        Promise.all(responseArr).then( imageUrl => {


            const newResponse = {
                tag,
                'image_string' : imageUrl.join(),
                'image_array' : imageUrl
            };

            console.log(newResponse)
            console.log(state)


            tagExist(responseArr, SEARCH_CUSTOM_TAGS, newResponse)

        });






    }


    const setGroupMode = () => dispatch({type:SET_GROUP_MODE})
    const setLoading = () => dispatch({type:SET_LOADING})

    const clearImg = ()  => dispatch({type: CLEAR_IMG})


    const {data, img, groupMode, incorrectTag, loading} = state
    return (
        <GiphyContext.Provider value={{searchSimpleTag, searchCustomTag, setGroupMode, clearImg,
            state, data, groupMode, incorrectTag, img, loading}}>
            {children}
        </GiphyContext.Provider>
    )
    }
;

export default GiphyState;