import { setUserData } from "../../../store/slices/user.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import isTokenValid from "../user/authUtils";

const getUserbyId = (setLoading) => {
    if (isTokenValid()) {
        setLoading(true);
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/audit/synchronize`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                console.log("Sincronizacion exitosa");
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    } else {
        console.log("su token espiró");
    }
};

export default getUserbyId;
