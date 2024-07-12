import { Link, useNavigate } from "react-router-dom";
import "./Modal.scss";
import PropTypes from "prop-types";
import BackButton from "./BackButton";

function Modal({ isOpen, message }) {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate("/");
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      closeModal();
    }
  };
  return isOpen ? (
    <Link
      className="modal"
      role="dialog"
      aria-modal="true"
      to="/"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
    >
      <div className="modal-content">
        <BackButton />
        <p>{message}</p>
      </div>
    </Link>
  ) : null;
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Modal;
