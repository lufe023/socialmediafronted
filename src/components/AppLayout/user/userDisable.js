import Swal from "sweetalert2";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const userDisable = (user, active) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${user}`;

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

    axios
        .patch(URL, { active }, getConfig())
        .then((res) => {
            Toast.fire({
                icon: "success",
                title: "Cambio Exitoso",
            });
        })
        .catch((err) => {
            const errorMessage =
                err.response?.data?.message || "Error inesperado";
            console.log(err);
            Toast.fire({
                icon: "error",
                title: errorMessage,
            });
        });
};

export default userDisable;
