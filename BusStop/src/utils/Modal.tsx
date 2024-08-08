const Modal = (props: { isOpen: any; setModalOpen: (arg0: boolean) => void; }) => {
  if (props.isOpen) {
    return (
      <div className="modal-wrapper">
        <h2>This is Modal</h2>
        <button onClick={()=>{props.setModalOpen(false)}}>x</button>
      </div>
    );
  } else {
    return <></>;
  }
};
export default Modal;
