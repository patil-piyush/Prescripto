import { createContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [doctors, setDoctors] = useState([])  //state variable to store the all doctors array

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    // function to get all doctors data
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendURL + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    //function to change availability of doctor
    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendURL+'/api/admin/change-availability', {docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,
        setAToken,
        backendURL,
        doctors,
        getAllDoctors,
        changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider