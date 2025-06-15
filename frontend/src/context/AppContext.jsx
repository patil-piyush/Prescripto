import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    //function to get all the doctors data
    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendURL+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = {
        doctors, 
        currencySymbol,
        token,
        setToken,
        backendURL
    }

    return <AppContext.Provider value={value} >
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider