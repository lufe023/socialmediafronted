import axios from "axios";
import getConfig from "../../utils/getConfig";
import isTokenValid from "./authUtils";

const getUserbyId = (userId, setTransactions) => {
    if (isTokenValid()) {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/transactions/history/${userId}`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setTransactions(res.data);
            })
            .catch((err) => console.log(err));
    } else {
        console.log("su token espiró");
    }
};

export default getUserbyId;
