import * as ActionTypes from './ActionTypes';
import { ChannelsURL } from '../ChannelsURL';

export const fetchChEvents = () => (dispatch) => {
    dispatch(eventsLoading());

    return fetch(ChannelsURL + 'events')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(chEvents => dispatch(addEvents(chEvents)))
    .catch(error => dispatch(eventsFailed(error.message)));
};

export const eventsLoading = () => ({
    type: ActionTypes.EVENTS_CH_LOADING
});

export const eventsFailed = (errmess) => ({
    type: ActionTypes.EVENTS_CH_LOADING_FAILED,
    payload: errmess
});

export const addEvents = (chEvents) => ({
    type: ActionTypes.ADD_CH_EVENTS,
    payload: chEvents
});
