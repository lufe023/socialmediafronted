import Swal from "sweetalert2";
import getConfig from "../../utils/getConfig";
import axios from "axios";

const changeUserRole = (id, newRoleId, getPeople) => {
    console.log(id); //5fc417ad-1431-4427-9f66-01e194f66703

    const URL = `${
        import.meta.env.VITE_API_SERVER
    }/api/v1/users/role/changeUserRole`;
    axios
        .patch(URL, { id, newRoleId }, getConfig())
        .then((res) => {
            getPeople();
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
                title: "Nuevo rol asignado",
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
                title: `${err.response.data.message}`,
            });
        });
};

export default changeUserRole;
