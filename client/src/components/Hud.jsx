import PropTypes from "prop-types";
import "./Hud.scss";

function Hud({ children }) {
  return <div className="hud-container">{children}</div>;
}

Hud.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Hud;
