import firebase from 'firebase/app'
import { auth, provider, signInWithPopup, storage, GoogleAuthProvider, getStorage, collection, addDoc, serverTimestamp } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import db from '../firebase'
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
        if (payload.image !== "") {
            // const storage = getStorage();
            const fileRef = ref(storage, `images/${payload.image.name}`);
            const uploadTask = uploadBytes(fileRef, payload.image);
            const articlesRef = collection(db, 'articles');

      uploadTask
        .then((snapshot) => {
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
                })
                .catch((error) => {
                  console.error('Error adding document: ', error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}

            // const upload = storage
            //     .ref(`images/${payload.image.name}`)
            //     .put(payload.image);
            // upload.on("state_changed", (snapshot) => {
            //     const progress = (
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            //     console.log(`Progress: $(progress)%`);
            //     if (snapshot.state === 'RUNNING') {
            //         console.log(`Progress: $(progress)%`);
            //     }
            // }, error => console.log(error.code),
            // async () => {
            //     const downloadURL = await upload.snapshot.ref.getDownloadURL();
            //     db.collection('articles').add({
            //         actor: {
            //             description: payload.user.email,
            //             title: payload.user.displayName,
            //             date: payload.timestamp,
            //             image: payload.user.photoURL
            //         },
            //         video: payload.video,
            //         sharedImg: downloadURL,
            //         comments: 0,
            //         description: payload.description,
            //     });
            // }
            // );