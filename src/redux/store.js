import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice';
import registerReducer from './features/registerSlice';
import userReducer from './features/clientSlice';
import servicesReducer from './features/servicesSlice'
import salesReducer from './features/salesSlice'
import paymentReducer from './features/paymentSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    users: userReducer,
    services: servicesReducer,
    sales: salesReducer,
    payments: paymentReducer,
  },
});

export default store;
