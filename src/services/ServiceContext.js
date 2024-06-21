import { createContext, useContext, useState } from "react";
import { apiService } from "./apiService";
import { GetUserState } from "./UserStateService";



const ServiceContext = createContext();

export const ServiceProvider = ({children})=>{
    const initUserState = GetUserState()
    const services= {
        apiService,
        userStateService : initUserState,
    }
    return(
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    )
}

export const useServices = ()=>{
    return useContext(ServiceContext)
}