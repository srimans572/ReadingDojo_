import React from "react"
import ReactLoading from 'react-loading';
import Modal from 'react-modal';
import styles from '../styles/tool.module.css'
import { Link } from "react-router-dom";


const Loader = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
    return(
    <div>
        <Modal
        className={styles.modal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        isOpen={modalIsOpen}
        onAfterOpen = {openModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        >       
        {props.loaderMessage ? <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 600 600"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg> : <ReactLoading type={"spin"} color={"#5440ec"} delay={10} height={50} width={50} />}
        {props.loaderMessage ? <p style={{fontFamily:"TrebuchetMS", fontStyle:"normal"}}>{props.loaderMessage}</p>:<p>This may take a few seconds</p>}
        {(props.loaderMessage && props.message != "You need at least one question for this action.")&& <button className={styles.loaderButton} onClick={async()=>{
          closeModal()
          window.location.reload();
        }}>Close</button>}
        {props.loaderMessage=="You need at least one question for this action." && <button className={styles.loaderButton} onClick={async()=>{
          closeModal()
          window.location.reload();
        }}>Close</button>}
        {props.loaderMessage=="You are already signed in." && <Link to="/account"><button className={styles.loaderButton} onClick={async()=>{
          closeModal()
        }}>Open</button></Link>}
      </Modal>
       
    </div>)
}

export default Loader