import { combineReducers} from 'redux-immutable';

import user from './userState.js';
import story from './storyState.js';

export default combineReducers({
    user,
    story
});