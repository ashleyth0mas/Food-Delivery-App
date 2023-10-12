import{
    GET_MENU_REQUEST,
    GET_MENU_SUCCESS,
    GET_MENU_FAIL
} from '../constants/menuConstant';

const initialState={    //here we initialise state
    menu:[],
    loading:false,
    error:null
}
export const menuReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_MENU_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
            case GET_MENU_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    menus:action.payload  //here menu items are stored to menus array
                }
                case GET_MENU_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    }
                default:
                    return state;
    }
}