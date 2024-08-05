import { Link } from "react-router-dom";
import "./AdminBackOffice.scss";
import AdminChargingStations from "../components/AdminChargingStations";
import AdminMessage from "../components/AdminMessage";
import AdminUser from "../components/AdminUser";
import AdminReservations from "../components/AdminReservations";
import useAuth from "../hooks/useAuth";

const hostUrl = import.meta.env.VITE_API_URL;

function AdminBackOffice() {
  const { user } = useAuth();

  return user ? (
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
