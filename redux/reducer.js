import * as ActionTypes from './ActionTypes';

export const chEvents = (state = { isChLoading: true,
                                 errChMess: null,
                                 chEvents: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CH_EVENTS:
            return { ...state, isChLoading: false, refreshing: false, errChMess: null, chEvents: action.payload };

        case ActionTypes.EVENTS_CH_LOADING:
            return { ...state, isChLoading: true, errChMess: null, chEvents: [] };

        case ActionTypes.EVENTS_CH_LOADING_FAILED:
            return { ...state, isChLoading: false, errChMess: action.payload };

        default:
          return state;
      }
};
