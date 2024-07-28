import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const hostUrl = import.meta.env.VITE_API_URL;

function LoginButton({ requestBody }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${hostUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      const user = await response.json();

      if (!response.ok) {
        toast.error("Oops. Une erreur s'est produite", {
          duration: 4000,
          position: "bottom-right",
        });
        return null;
      }

      login(user);

      toast.success("Connexion réussie", {
        duration: 4000,
        position: "bottom-right",
      });

      navigate("/map");
    } catch (e) {
      console.error(e.message);
      toast.error("Erreur lors de la connexion", {
        duration: 4000,
        position: "bottom-right",
      });
    }
    return null;
  };

  return (
    <button type="submit" className="button-lg-olive-fullfilled" onClick={handleLogin}>
      Se connecter
    </button>
  );
}

LoginButton.propTypes = {
  requestBody: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoginButton;
