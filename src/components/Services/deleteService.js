// deleteService.js
import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../utils/getConfig";

const deleteService = async (id) => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/services/${id}`;

    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!",
        cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(URL, getConfig());
            Swal.fire(
                "Eliminado!",
                "El servicio ha sido eliminado.",
                "success"
            );
            return true;
        } catch (error) {
            console.error("Error eliminando el servicio:", error);
            Swal.fire(
                "Error",
                "Hubo un problema al eliminar el servicio.",
                "error"
            );
            return false;
        }
    }
    return false;
};

export default deleteService;
