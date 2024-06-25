import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice';
import registerReducer from './features/registerSlice';
import userReducer from './features/clientSlice';
import servicesReducer from './features/servicesSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    users: userReducer,
    services : servicesReducer,
  },
});

export default store;
