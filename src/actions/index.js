import firebase from 'firebase/app'
import { auth, provider, signInWithPopup, storage, GoogleAuthProvider, getStorage, collection, addDoc, serverTimestamp, uploadBytesResumable, doc, getDoc, orderBy, query, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '../firebase'
import { onSnapshot, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import db from '../firebase'
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES, LIKE_POST } from '../actions/actionType'

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export const likePost = (payload) => ({
  type: LIKE_POST,
  payload: payload,
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
                likes: 0,
                likeUsers: [],
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
          likes: 0,
          likeUsers: [],
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
  
export function getArticlesAPI() {
  let payload;

  return (dispatch) => {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, orderBy('actor.date', 'desc'));
    const unsub = onSnapshot(q, orderBy('date', 'asc'), (querySnapshot) => {
      payload = querySnapshot.docs.map((doc) => {
        const article = doc.data();
        article.id = doc.id;
        return article;
      });
      dispatch(getArticles(payload));
    });
  };
}

export function signUpAPI(payload) {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const displayName = `${payload.firstName} ${payload.lastName}`;
        if (user) {
          updateProfile(auth.currentUser, {
            displayName: displayName,
          }).then(() => {
            const updatedUser = { ...user, displayName: displayName };
            dispatch(setUser(updatedUser));
          }).catch((error) => {
            alert(error.message);
          });
        }
        console.log(user);
        // user.displayName = displayName;
      }) 
      .catch((error) => {
        alert(error.message);
      });
  }
}

// works
export function passwordSignInAPI(payload) {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user));
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      })
  }
}

export function likePostAPI(payload) {
  return(dispatch) => {
    
    const articleRef = doc(db, 'articles', payload.id);
    getDoc(articleRef)
      .then((doc) => {
        if (doc.exists()) {
          const articleData = doc.data();
          if (!articleData.likeUsers.includes(payload.userId)) {
            const newLikes = articleData.likes + 1;
            const newLikeUsers = [...articleData.likeUsers, payload.userId];
            updateDoc(articleRef, { likes: newLikes, likeUsers: newLikeUsers })
              .then(() => {
                dispatch(likePost({ id: payload.id, likes: newLikes, likeUsers: newLikeUsers }));
              })
          } else if (articleData.likeUsers.includes(payload.userId)) {
            const newLikes = articleData.likes - 1;
            const newLikeUsers = articleData.likeUsers.filter((user) => user !== payload.userId);
            updateDoc(articleRef, { likes: newLikes, likeUsers: newLikeUsers })
              .then(() => {
                dispatch(likePost({ id: payload.id, likes: newLikes, likeUsers: newLikeUsers }))
              })
          }
        }
      })
  }
}