import Immutable from 'immutable';

import {
    GET_USER,
    GET_LIST,
    CLEAR_LIST,
    SET_DIALOG
} from '../constants/userTypes';

const initialState = Immutable.Map({
    user: {},
    activeList:[],
    activeDialog:{}
});

export default (state = initialState, action) => {
    switch(action.type) {

        case GET_USER: {
            const newState = Immutable.Map(state);
            let updateState = newState.setIn(['user'], action.data);
            return updateState.toJS();
        }

        case GET_LIST: {
            const newState = Immutable.Map(state);
            let updateState = newState.setIn(['activeList'], action.items);
            return updateState.toJS();
        }

        case CLEAR_LIST: {
            const newState = Immutable.Map(state);
            let updateState = newState.setIn(['activeList'], []);
            return updateState.toJS();
        }

        case SET_DIALOG: {
            const newState = Immutable.Map(state);
            let updateState = newState.setIn(['activeDialog'], action.data);
            return updateState.toJS();
        }

        default: {
            return state;
        }
    }
}