import "../style/input.scss";
import "../style/button.scss";
import "../style/colors.scss";
import "./AdminBackOffice.scss";
import { hostUrl } from "./Register";
import AdminChargingStations from "../components/AdminChargingStations";
import AdminMessage from "../components/AdminMessage";
import AdminUser from "../components/AdminUser";
import AdminPersonnalInfo from "../components/AdminPersonnalInfo";
import AdminReservations from "../components/AdminReservations";

function AdminBackOffice() {
  return (
    <div className="page-container">
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
        <section className="personal-info">
          <AdminPersonnalInfo />
        </section>
      </div>
    </div>
  );
}

export default AdminBackOffice;
