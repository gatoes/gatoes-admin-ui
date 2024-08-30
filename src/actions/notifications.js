import axios from 'axios';
import { API_ROOT, _dispatch } from '../constants';
export {_dispatch};
export const USER_NOTIFICATION_COUNTER = 'USER_NOTIFICATION_COUNTER';
const ROOT_URL = API_ROOT;
var token = "";

export function getNotificationCounter(params){
  return (dispatch) => {
    return axios(`${ROOT_URL}/serviceprovider/getnotificationcounter`, {
      method: 'GET',
      params : params
    })
    .then(response => {
      dispatch({
        type: USER_NOTIFICATION_COUNTER,
        payload: response.data.data.count
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}


export function getNotification(params) {
  return axios({
    method: 'GET',
    params: params,
    url: `${ROOT_URL}/serviceprovider/getnotification`,
  });
}

export function setReadStatus(props) {
  return axios({
    method: 'POST',
    data: props,
    url: `${ROOT_URL}/serviceprovider/setreadstatus`,
  });
}
