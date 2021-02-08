export const  giphyReducer = (state : any, action : any) => {
    switch(action.type) {
        case 'SEARCH_SIMPLE_TAGS': {
            const currentInfo = !state.data[action.payload.tag]
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
                loading: false,
                incorrectTag: false
            }
        }
        case 'SEARCH_CUSTOM_TAGS': {
            const currentInfo = !state.data[action.payload.tag]
                ? [action.payload['image_url']]
                : [...state.data[action.payload.tag], action.payload['image_url']];

            const newInfo = {
                ...state.data,
                [action.payload.tag]:
                     currentInfo
            };

            const newImg  = [
                ...state.img,
                action.payload['image_string']
            ]

            if(action.payload['image_string'] === null) {
                return {
                    ...state,
                    data: newInfo,
                    loading: false,
                    incorrectTag: false,
                    incorrectTags: []

                }
            } else return {
                ...state,
                data: newInfo,
                img: newImg,
                loading: false,
                incorrectTag: false,
                incorrectTags: []

            }


        }

        case 'SET_GROUP_MODE': {
            return {
                ...state,
                groupMode: !state.groupMode
            }
        }
        case 'TAG_NOT_FOUND': {
            return {
                ...state,
                loading: false,
                incorrectTag: true,
                incorrectTags: []
            }
        }
        case 'TAGS_NOT_FOUND': {
            return {
                ...state,
                loading: false,
                incorrectTags: action.payload,
                incorrectTag: false
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