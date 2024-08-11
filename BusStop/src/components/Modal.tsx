import "../App.css";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose, children }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="modal-wrapper" onClick={onClose}>
      <div className="modal-content">
        <button className="modal-button" onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
