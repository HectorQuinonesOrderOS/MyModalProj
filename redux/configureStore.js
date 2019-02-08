import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { chEvents } from '../redux/reducer';
/*import { users } from './users';
import { podcast } from './podcast';
import { videocast } from './videocast';
*/

export const ConfigureStore = () => {
    const config = {
        key: 'root',
        storage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers(config, {
            chEvents,
        }),
        applyMiddleware(thunk, logger)
    );

     const persistor = persistStore(store);

    return { persistor, store };
};
