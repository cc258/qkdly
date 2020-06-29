import thunk from 'redux-thunk';

import { createStore, applyMiddleware, combineReducers, compose} from 'redux';

const INITIAL: any ={};
const store = createStore(
    combineReducers({
        INITIAL,

    }),
    compose(
        applyMiddleware(thunk),
    )
)
export default store;