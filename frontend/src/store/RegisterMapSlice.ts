import { createSlice } from '@reduxjs/toolkit';

export const RegisterMapSlice = createSlice({
	name: 'registerMap',
	initialState: {
		spotName: '',
		spotBuildingName: '',
		spotCategory: '',
		spotTelNumber: '',
		checkedList: [] as string[],
		// checkedList: [
			// { key: '1', value: '휠체어 접근 가능', isChecked: false },
			// { key: '2', value: '해당 장소가 1층에 위치함', isChecked: false },
			// { key: '3', value: '장애인 화장실 있음', isChecked: false },
			// { key: '4', value: '애완견/도우미견 출입가능', isChecked: false },
			// { key: '5', value: '장애인 엘리베이터 있음', isChecked: false },
			// { key: '6', value: '엘리베이터 있음', isChecked: false },
			// { key: '7', value: '건물 내 무료주차 가능', isChecked: false },
			// { key: '8', value: '가족/어린이 이용에 적합', isChecked: false },
		// ],
	},
	reducers: {
		addTospotName(state, action) {
			state.spotName = action.payload;
		},
		addTospotBuildingName(state, action) {
			state.spotBuildingName = action.payload;
		},
		addTospotCategory(state, action) {
			state.spotCategory = action.payload;
		},
		addTospotTelNumber(state, action) {
			state.spotTelNumber = action.payload;
		},
		toggleChecked: (state, action) => {
      const itemIndex = state.checkedList.indexOf(action.payload);
      if (itemIndex === -1) {
        state.checkedList.push(action.payload);
      } else {
        state.checkedList.splice(itemIndex, 1);
      }
    },
		// addTocheckedList(state, action) {
		// 	state.checkList = action.payload;
		// },
	// 	addTocheckedList(state, action) {
	// 		switch (action.type) {
	// 			case 'TOGGLE_CHECKBOX':
	// 				return {
	// 					...state,
	// 					checkboxes: state.checkList.map((checkbox) =>
	// 						checkbox.key === action.payload.id
	// 							? { ...checkbox, isChecked: action.payload.isChecked }
	// 							: checkbox
	// 					),
	// 				};
	// 			default:
	// 				return state;
	// 		}
	// 	},
	},
});

export const RegisterMapAction = RegisterMapSlice.actions;
export const RegisterMapReducer = RegisterMapSlice.reducer;
