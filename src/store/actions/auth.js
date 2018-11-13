import * as actionTypes from './actionTypes';
import axios from 'axios';
// axios.request

export const authStart      = (  ) => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess    = ( authData ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail       = ( err ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const auth = ( email, password ) => async (dispatch) => {
    await dispatch( authStart() );

    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    let url =  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAFi-Tm603OZoRjGbMJiEXj4gZhbvfacjs';


    await axios.post(url, authData,{headers:{'Access-Control-Allow-Origin':'*',"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}})
            .then( res => {
                console.log(res.data)
                dispatch(authSuccess(res.data))
            })
            .catch( err => {
                console.error(err)
                dispatch(authFail(err))
            })
}