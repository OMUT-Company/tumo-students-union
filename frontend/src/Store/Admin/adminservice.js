import axios from "axios"

const accessToken = sessionStorage.getItem("accessToken")
const signIn = async (data) => {
    console.log(data)
    const res = await axios.post("/api/admin/login", data)

    return res.data
}

const addOrganization = async (data) => {
    const res = await axios.post("/api/organization", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res.data
}

const getAllFunders = async () => {
    const res = await axios.get("/api/organization/get", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res.data
}

const deleteOrganization = async (data) => {
    const {id} = data
    const res = await axios.delete(`/api/organization/deleted/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res.data
}

const updateOrganization = async (data)=>{

    const res = await axios.put("/api/organization/update",data,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return res.data
}

const getOrganizationOffer = async ()=>{

    const res = await axios.get("/api/organization/offer/get",{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return res.data
}

const refusedOrganizationOffer = async (data)=>{
    const {id} = data
    const res = await axios.delete(`/api/organization/offer/refused/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return res.data
}
export const adminService = {
    signIn,
    addOrganization,
    getAllFunders,
    deleteOrganization,
    updateOrganization,
    getOrganizationOffer,
    refusedOrganizationOffer
}