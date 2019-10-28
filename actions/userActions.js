import {
    GET_USER,
    STORE_IMAGES,
    GET_LIST,
    CLEAR_LIST,
    SET_DIALOG
} from '../constants/userTypes';

const getUser = (user) => dispatch => {
    return fetch(``, {
        method:'POST',
        body:JSON.stringify({
            uuid: user.uuid
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        if(json.error) {

        } else {
            firebase.auth().signInWithCustomToken(json.token).then(function(data){
                return dispatch({ type: GET_USER, json });
            })
        }
    })
};

const getList = () => dispatch => {
    return fetch(``, {
        method:'GET',
    })
    .then(response => response.json())
    .then(json => {
        if(json.error) {

        } else {
            return dispatch({ type: GET_LIST, json });
        }
    })
}

const storeImages = (data) => dispatch => {

    fetch(``, {
        method:'POST',
        body: JSON.stringify({
            media: data.images
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        if(json.error) {

        } else {
            dispatch({ type: STORE_IMAGES, json})
        }
    });
}

const setActiveDialog = (data) => dispatch => {
    dispatch({ type: SET_DIALOG, data });
}

const clearList = () => dispatch => {
    dispatch({ type: CLEAR_LIST });
}

export {
    getUser,
    getList,
    clearList,
    storeImages,
    setActiveDialog
}