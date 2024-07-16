import { Link } from "react-router-dom";
import "./Connect.scss";
import "./Plug.scss";
import plugcombo from "../../public/plugcombo.svg";
import plugchade from "../../public/plugchade.svg";
import plugtype2 from "../../public/plugtype2.svg";

function Plug() {
  return (
    <div className="azer">
      <h2 className="descr" id="texte">
        Selectionnez la prise correspondante a votre vehicule
      </h2>
      <fieldset className="box-green">
        <div>
          <img src={plugcombo} alt="Prise de rechargement combo" />
          <input type="radio" id="combo" name="drone" value="huey" checked />
          <label htmlFor="huey">Prise Combo</label>
        </div>
        <div>
          <img src={plugchade} alt="Prise de rechargement chade" />
          <input type="radio" id="chade" name="drone" value="huey" checked />
          <label htmlFor="huey">Prise Chade</label>
        </div>
        <div>
          <img src={plugtype2} alt="Prise de rechargement type 2" />
          <input type="radio" id="type2" name="drone" value="huey" checked />
          <label htmlFor="huey">Prise Type 2</label>
        </div>
      </fieldset>
      <Link to="/map" className="button-home">
        Seletionner
      </Link>
    </div>
  );
}

export default Plug;
