import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
}

const authStart = ( state, action )  => {
    return updateObject( state, { error:null, loading: true })
}

const authSuccess = ( state, action ) => {
    return updateObject( state, { error: null, loading: false, userId: action.userId, token: action.idToken } )
}

const authFail  = ( state, action ) => {
    return updateObject( state, { error: action.error, loading: false } )
}

const authReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case AUTH_START:    return authStart( state, action );
        case AUTH_SUCCESS:  return authSuccess( state, action );
        case AUTH_FAIL:     return authFail( state, action );
        default: return state;
    }
}

export default authReducer;