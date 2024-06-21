import { useReducer, useState } from "react"

const useStatueUpdateTypes = {
    UPDATE_USER_NAME :"UPDATE_USER_NAME",
    UPDATE_USER_ID :"UPDATE_USER_ID",
    AUTHENTICATE_USER :"AUTHENTICATE_USER",
}

const initialState ={
    IS_USER_AUTHENTICATED: false,
    USER_NAME: "jj",
    USER_ID: "",

}
const userStateReducer = (state, action)=>{
    console.log('reducre')
    let newState;
    switch (action.type){
        case useStatueUpdateTypes.UPDATE_USER_ID:
            newState ={...state, USER_ID : action.value }
            console.log("updated... ",newState)
            return newState
        case useStatueUpdateTypes.UPDATE_USER_NAME:
            newState = {...state, USER_NAME : action.value }
            console.log("updated... ",newState)
            return newState
        case useStatueUpdateTypes.AUTHENTICATE_USER:
            newState = {...state, IS_USER_AUTHENTICATED: action.value }
            return newState;
    }
}


export const GetUserState = ()=>{
    const [state, dispatch] = useReducer(userStateReducer,initialState)
    return {state, dispatch}
    
}