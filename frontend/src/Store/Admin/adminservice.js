import axios from "axios";

const adminLogin = async (data, thunkAPI) => {

   const res = await axios.post("api/admin/login",data)

        return res.data

}

export const AdminService = {
    adminLogin
}