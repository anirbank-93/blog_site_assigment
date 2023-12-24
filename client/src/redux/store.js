import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
// import { thunk } from 'redux-thunk';

// Reducers
import BlogPostReducer from './slices/postsSlice';

let rootReducer = combineReducers({
    blogPostSlice: BlogPostReducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    // middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;