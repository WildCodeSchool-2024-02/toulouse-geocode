import { Link } from "react-router-dom";
import "./Modal.scss";
import PropTypes from "prop-types";
import BackButton from "./BackButton";

function Modal({ isOpen, onClose }) {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  return isOpen ? (
    <Link
      className="modal"
      role="dialog"
      aria-modal="true"
      to="/"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div className="modal-content">
        <BackButton />
        <p>Votre message a été envoyé avec succès !</p>
      </div>
    </Link>
  ) : null;
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
