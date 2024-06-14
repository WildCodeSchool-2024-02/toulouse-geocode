import { Link } from "react-router-dom";
import logo from "../../public/logo.svg";
import "./Home.scss";

function Home() {
  return (
    <div className="boxHome">
      <img className="logoCSS" src={logo} alt="Logo du site WEB" />
      <p className="textHome">Trouvez une borne de recharge sur votre trajet</p>
      <Link to="/map" className="buttonHome">
        Commencer
      </Link>
    </div>
  );
}

export default Home;
