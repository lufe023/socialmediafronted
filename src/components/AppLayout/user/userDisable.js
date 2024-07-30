import Swal from "sweetalert2";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const userDisable = (user, active) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${user}`;
    axios
        .patch(URL, { active: active }, getConfig())
        .then((res) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "success",
                title: "Cambio Exitoso",
            });
        })
        .catch((err) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });
            console.log(err);
            Toast.fire({
                icon: "error",
                title: err.response.data.message,
            });
        });
};
export default userDisable;
