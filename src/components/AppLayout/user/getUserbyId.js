import { setUserData } from "../../../store/slices/user.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import isTokenValid from "./authUtils";

const getUserbyId = (id, setUser) => {
    if (isTokenValid()) {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${id}`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    } else {
        console.log("su token espiró");
    }
};

export default getUserbyId;
