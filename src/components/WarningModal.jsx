import ReactDOM from "react-dom";

export default function WarningModal(props) {
  if (!props.isOpen) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <ModalElement params={props} />,
        document.getElementById("modal")
      )}
    </>
  );
}

function ModalElement(props) {
  const {
    params: { title, message, onConfirm, onCancel },
  } = props;

  //   return (
  //     <>
  //       <div className="modal-backdrop" />
  //       <div className="modal-container">
  //         <h1>Hello World!!!</h1>
  //       </div>
  //     </>
  //   );

  return (
    <>
      <div className="modal-backdrop" />
      <div className="modal-container">
        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{message}</p>
            <button className="btn btn-info" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
