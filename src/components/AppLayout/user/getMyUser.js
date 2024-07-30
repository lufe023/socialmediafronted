import { setUserData } from "../../../store/slices/user.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import isTokenValid from "./authUtils";

const getUserbyId = (dispatch) => {
    if (isTokenValid()) {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/me`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                dispatch(setUserData(res.data));
            })
            .catch((err) => console.log(err));
    } else {
        console.log("su token espiró");
    }
};

export default getUserbyId;
