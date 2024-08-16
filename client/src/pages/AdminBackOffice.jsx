import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminBackOffice.scss";
import AdminChargingStations from "../components/AdminChargingStations";
import AdminMessage from "../components/AdminMessage";
import AdminUser from "../components/AdminUser";
import AdminReservations from "../components/AdminReservations";
import useAuth from "../hooks/useAuth";

const hostUrl = import.meta.env.VITE_API_URL;

function AdminBackOffice() {
  const { user, logout } = useAuth();

  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`${hostUrl}/api/users/${user?.id}`, {
            credentials: "include",
          });
          if (response.status === 401) {
            logout();
            console.info("Unauthorized access - localStorage cleared");
          } else if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
          } else {
            console.error("Error fetching user data:", response.status);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    checkUserData();
  }, [user]);

  return user && isAdmin ? (
    <div className="admin-back-office-container">
      <div className="admin-back">
        <header className="header">
          <h1>Espace administrateur</h1>
        </header>
        <section>
          <AdminMessage hostUrl={hostUrl} />
          <AdminUser hostUrl={hostUrl} />
          <AdminReservations hostUrl={hostUrl} />
          <AdminChargingStations hostUrl={hostUrl} />
        </section>
      </div>
    </div>
  ) : (
    <div className="admin-reservation-empty-container">
      <p>Connectez vous pour accéder à cette page.</p>
      <Link className="button-md-olive-outlined" to="/login">
        Connexion
      </Link>
    </div>
  );
}

export default AdminBackOffice;
