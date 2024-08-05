import { Link } from "react-router-dom";
import logo from "../../public/logo.svg";
import "./Home.scss";

function Home() {
  return (
    <div className="box-home-container">
      <div className="box-home">
        <img className="logo" src={logo} alt="Logo du site WEB" />
        <p className="text-home">Trouvez une borne de recharge sur votre trajet</p>
        <Link to="/map" className="button-lg-olive-fullfilled">
          Commencer
        </Link>
      </div>
    </div>
  );
}

export default Home;
