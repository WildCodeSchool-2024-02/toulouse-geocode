import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const hostUrl = import.meta.env.VITE_API_URL;

function LogoutButton({ label = "" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${hostUrl}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        logout();
        toast.success("Vous etes deconnecte", {
          duration: 4000,
          position: "bottom-right",
        });
        navigate("/login");
      } else {
        console.error("Failed to log out");
        toast.error("Échec de la déconnexion", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Erreur lors de la déconnexion", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <button className="close-button" onClick={handleLogout} type="button">
        {label}
      </button>
      <Toaster />
    </>
  );
}

LogoutButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default LogoutButton;
