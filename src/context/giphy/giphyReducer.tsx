

// const newTag = (state,payload ) => !state.tag[payload.tag]
//     ? [payload.tag]
//     : [...state.tag[payload.tag], payload['img_url']];
//
// const handlers : any = {
//
//     [SEARCH_TAGS]: (state : any, {payload}: any,) => (
//         const dasdad = [];
//
//         return {...state, newTag(state, payload )}),
//     [GET_IMG_URL]: (state : any, {payload}: any) => (
//         {...state, image_url: payload, loading: false}),
//     DEFAULT: (state : any) => state
// }

export const  giphyReducer = (state : any, action : any) => {

    switch(action.type) {
        case 'SEARCH_TAGS': {
            const currentTag= !state.tags[action.payload.tag]
                ? [action.payload['image_url']]
                : [...state.tags[action.payload.tag], action.payload['image_url']];

            const newTag = {
                ...state.tags,
                [action.payload.tag]:
                    currentTag

            };

            return {
                ...state,
                tags: newTag,
            }
        }
        default:
            return state
    }
    // const handler = handlers[action.type] || handlers.DEFAULT
    // return handler(state, action)
}