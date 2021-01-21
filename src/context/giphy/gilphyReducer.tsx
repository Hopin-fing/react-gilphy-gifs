import {SEARCH_TAGS} from "../types";

const handlers : any = {
    [SEARCH_TAGS]: (state : any, {playload}: any) => ({...state, img: playload, loading: false}),
    DEFAULT: (state : any) => state
}

export const  gilphyReducer = ( state : any, action : any) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}