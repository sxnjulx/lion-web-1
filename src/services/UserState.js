// export const useStateUpdateTypes = {
//     UPDATE_USER_NAME: "UPDATE_USER_NAME",
//     UPDATE_USER_ID: "UPDATE_USER_ID",
// };

// export const initialState = {
//     USER_NAME: "jj",
//     USER_ID: "",
// };

// export const userStateReducer = (state, action) => {
//     console.log('reducer');
//     let newState;
//     switch (action.type) {
//         case useStateUpdateTypes.UPDATE_USER_ID:
//             newState = { ...state, USER_ID: action.value };
//             console.log("updated... ", newState);
//             return newState;
//         case useStateUpdateTypes.UPDATE_USER_NAME:
//             newState = { ...state, USER_NAME: action.value };
//             console.log("updated... ", newState);
//             return newState;
//         default:
//             return state;
//     }
// };
