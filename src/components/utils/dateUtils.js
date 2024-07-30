import { format } from "date-fns";

/**
 * Formatea una fecha en un formato legible.
 * @param {string} dateString - La fecha en formato de cadena.
 * @returns {string} - La fecha formateada.
 */
export const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy"); // Puedes ajustar el formato aquí según tus necesidades
    } catch (error) {
        console.error("Error formateando la fecha:", error);
        return "";
    }
};
