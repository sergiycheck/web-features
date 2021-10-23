import { createSlice } from "@reduxjs/toolkit";

export const  itemSlice = createSlice({
	name:'defaultName',
	initialState:{
		value:0
	},
	reducers:{
		increment(state, action){
			state.value += action.payload;
		}
	}

});

export const {
	increment,
} = itemSlice.actions;

export const selectItemValue = state=> state.items.value

export default itemSlice.reducer