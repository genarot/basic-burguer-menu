import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../actions/actionTypes";

const initialState = {

}

const authStart = ( state, action )  => {

}

const authSuccess = ( state, action ) => {

}

const authFail  = ( state, action ) => {
    
}

const authReducer = ( state = initialState, action ) {
    switch( action.type ) {
        case AUTH_START:
            return;
        case AUTH_SUCCESS:
            return;
        case AUTH_FAIL:
            return;
        default: return state;
    }
}

export default authReducer;