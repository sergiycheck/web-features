import { configureStore } from "@reduxjs/toolkit";

import itemReducer from './ItemSlice';

export default configureStore({
	reducer:{
		items:itemReducer
	}
})