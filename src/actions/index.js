import firebase from 'firebase/app'
import { auth, provider, signInWithPopup, GoogleAuthProvider } from '../firebase'
import { SET_USER } from '../actions/actionType'

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(setUser(result.user))
            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };
}

