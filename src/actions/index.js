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
                alert(error.message);
            });
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((error) => {
            console.log(error.message);
        })
    };
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        
    }
}