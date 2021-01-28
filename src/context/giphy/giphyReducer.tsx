export const  giphyReducer = (state : any, action : any) => {

    switch(action.type) {
        case 'SEARCH_TAGS': {
            const currentInfo= !state.data[action.payload.tag]
                ? [action.payload['image_url']]
                : [...state.data[action.payload.tag], action.payload['image_url']];

            const newInfo = {
                ...state.data,
                [action.payload.tag]:
                    currentInfo
            };

            const newImg = [
                ...state.img,
                action.payload['image_url']
            ]

            return {
                ...state,
                data: newInfo,
                img: newImg,
                loading: false
            }
        }
        case 'SET_GROUP_MODE': {
            return {
                ...state,
                groupMode: !state.groupMode
            }
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true
            }
        }
        case 'CLEAR_IMG': {
            return {
                data: {},
                img: []
            }
        }
        default:
            return state
    }
}