import "./Connect.scss";
import "./button.scss";
import "./input.scss";
import "./Plug.scss";
import plugcombo from "../../public/plugcombo.svg";
import plugchade from "../../public/plugchade.svg";
import plugtype2 from "../../public/plugtype2.svg";

function Plug() {
  return (
    <div>
      <select className="select-plug">Type de prise</select>
      <div className="box-green">
        <img
          className="plug-css"
          src={plugcombo}
          alt="Prise de rechargement type 2"
        />
        <img
          className="plug-css"
          src={plugchade}
          alt="Prise de rechargement type 2"
        />
        <img
          className="plug-css"
          src={plugtype2}
          alt="Prise de rechargement type 2"
        />
      </div>
    </div>
  );
}

export default Plug;
