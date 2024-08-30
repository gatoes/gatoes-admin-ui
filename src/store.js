import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import MemoryStorage from 'redux-persist-memory-storage';
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index'; // the value from combineReducers
import {clearSession} from './utilities';
import {toast} from 'react-toastify';

const middleware = applyMiddleware(ReduxThunk, logger);

const persistConfig = {
	key: 'root',
	storage: new MemoryStorage()
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, compose(middleware));
export const persistor = persistStore(store);

//Send access token in every request
axios.interceptors.request.use(function (config) {
	const accessToken = window.localStorage.jwtToken || null; //new Date().getMilliseconds();
  // if(typeof accessToken !== 'undefined' && accessToken !== null)
  //   accessToken = {accessToken}; 
  const UTCOffset = new Date().getTimezoneOffset();
  const language = window.localStorage.contentlanguage || 'en';
	config.headers = { 
      authorization: `Bearer ${accessToken}`,
      utcoffset: UTCOffset,
      devicetype: 'ANDROID',
      ["ngrok-skip-browser-warning"]:"1",
      contentlanguage: language
  };

  if(window.globalPageLoader !== null){
    window.globalPageLoader.setState({
      display: true
    });
  }

	return config;
}, function (error) {
  if(window.globalPageLoader !== null){
    window.globalPageLoader.setState({
      display: false
    });
  }
	return Promise.reject(error);
});

// Add a response interceptor to check user session
axios.interceptors.response.use(function (response) {

  console.log('response', response);

  if(window.globalPageLoader !== null){
    window.globalPageLoader.setState({
      display: false
    });
  }
  return response;
}, function (error) {
  if(window.globalPageLoader !== null){
    window.globalPageLoader.setState({
      display: false
    });
  }
	// If session is unauthorised, then logout the user.
  if(
  	typeof error.response !== 'undefined' 
  	&& typeof error.response.status !== 'undefined' 
  	){
    switch(error.response.status){
      case 401:
        clearSession();
        break;
      case 400:
        // Set form error toast here
        toast.error(error.response.data.message);
        //toast.error('Something wrong with your form fields value');
        break;
      default:
        // Set "Something went wrong" global error toast here
        toast.error('Something wrong, please try again');
    }
  }
  // Do something with response error
  return Promise.reject(error);
});