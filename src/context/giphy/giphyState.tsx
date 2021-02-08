import React, {useReducer} from 'react';
import {GiphyContext} from './giphyContex';
import axios from "axios";
import { giphyReducer } from './giphyReducer';
import {CLEAR_IMG, SEARCH_CUSTOM_TAGS, SEARCH_SIMPLE_TAGS, SET_GROUP_MODE, SET_LOADING, TAGS_NOT_FOUND, TAG_NOT_FOUND} from "../types";


const API_KEY : any = process.env.REACT_APP_API_KEY;

type TypeTagResponse = {
    tag : string[],
    image_url : string | null,
    image_string ?: null,
}
type TypeState = {
    data: object,
    img: Array<string>,
    groupMode: boolean,
    incorrectTag: boolean,
    incorrectTags: Array<string>
    loading: boolean,
}


const GiphyState = ({children} : any) => {
    const initialState : TypeState  = {
        data: {},
        img: [],
        groupMode: false,
        incorrectTag: false,
        loading: false,
        incorrectTags: []
    };




    const [state, dispatch] = useReducer(giphyReducer, initialState);
    const tagExist = (response : Array<object>, type : string, payload : object, wrongTagsCost :Array<string> = [] ) => {


        console.log(response)
        console.log(payload)
        console.log(wrongTagsCost)
        // response.forEach(element => console.log(element))
        // console.log(payload.split(','))

        if (Object.keys(response).length && wrongTagsCost.length === 0) {
            dispatch({
                type: type,
                payload: payload
            })
        } else if ( wrongTagsCost.length > 0) {
            dispatch({
                type: TAGS_NOT_FOUND,
                payload: wrongTagsCost
            })
        } else {

            dispatch({
                type: TAG_NOT_FOUND,
            })
        }
    }

    const searchSimpleTag = async (tag : Array<string>)   => {
        setLoading()

        const response = await axios
            .get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}&rating=r`)
            .then(res => res.data.data)
            .catch(e => console.error(e))


        const imageUrl = response['image_url']
        const newResponse : TypeTagResponse = {
            tag,
            'image_url' : imageUrl
        };


        tagExist(response, SEARCH_SIMPLE_TAGS, newResponse)



    }

    const searchCustomTag = async (tag : Array<string>)   => {
        setLoading()

        const  responseArr : any = tag.map( (item : string) => {
            return axios
                .get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${item}&rating=r`)
                .then(res => res.data.data['image_url'])
        })


        Promise.all(responseArr).then( imageUrl => {

            let wrongTagsCost : Array<string> =  []

            tag.map((item : string, index: number) => {
                const newResponse : any = {
                    tag: item,
                    'image_url' : imageUrl[index]
                }

                if(imageUrl[index] === undefined) {
                    wrongTagsCost.push(item)
                }



                if(tag.length - 1 !== index) {
                    newResponse['image_string'] = null
                }else {
                    newResponse['image_string'] = imageUrl.join()
                }


                return tagExist(responseArr, SEARCH_CUSTOM_TAGS, newResponse, wrongTagsCost)

            })

            console.log(wrongTagsCost)


        });






    }


    const setGroupMode = () => dispatch({type:SET_GROUP_MODE})
    const setLoading = () => dispatch({type:SET_LOADING})

    const clearImg = ()  => dispatch({type: CLEAR_IMG})


    const {data, img, groupMode, incorrectTag, incorrectTags, loading} = state
    return (
        <GiphyContext.Provider value={{searchSimpleTag, searchCustomTag, setGroupMode, clearImg,
            state, data, groupMode, incorrectTag, incorrectTags, img, loading}}>
            {children}
        </GiphyContext.Provider>
    )
    }
;

export default GiphyState;