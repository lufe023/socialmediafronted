import { jwtDecode } from "jwt-decode";

const isTokenValid = () => {
    const token = localStorage.getItem("token");

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
            // Token has expired
            localStorage.removeItem("token");
            return false;
        }

        // Token is valid
        return true;
    }

    // No token found
    return false;
};

export default isTokenValid;
