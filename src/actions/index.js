import firebase from 'firebase/app'
import { auth, provider, signInWithPopup, storage, GoogleAuthProvider, getStorage, collection, addDoc, serverTimestamp, uploadBytesResumable } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import db from '../firebase'
import { SET_USER, SET_LOADING_STATUS } from '../actions/actionType'

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
})

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

export function postArticleAPI(payload, onProgress) {
    return (dispatch) => {
      dispatch(setLoading(true));

      if (payload.image !== "") {
        const fileRef = ref(storage, `images/${payload.image.name}`);
        const uploadTask = uploadBytesResumable(fileRef, payload.image);
        const articlesRef = collection(db, 'articles');
  
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(onProgress(progress));
          if (snapshot.state === 'RUNNING') {
            console.log(`Progress: ${onProgress(progress)}%`);
          }
        }, (error) => {
          console.error('Error uploading file:', error);
        }, () => {
          getDownloadURL(fileRef)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              const article = {
                actor: {
                  description: payload.user.email,
                  title: payload.user.displayName,
                  date: payload.timestamp,
                  image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: downloadURL,
                comments: 0,
                description: payload.description,
              };
              addDoc(articlesRef, article)
                .then((docRef) => {
                  console.log('Document written with ID: ', docRef.id);
                  dispatch(setLoading(false));
                })
                .catch((error) => {
                  console.error('Error adding document: ', error);
                });
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        });
      } else if (payload.video) {
        const articlesRef = collection(db, 'articles');
        const article = {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: '',
          comments: 0,
          description: payload.description,
        }
        addDoc(articlesRef, article)
          .then(() => {
            console.log('Video added');
            dispatch(setLoading(false));
          })
          .catch((error) => {
            console.error('Error adding video: ', error);
          })
        }
    };
}
  
  