import React, { useState } from "react";
import "./UploadField.css";
import Modal from "@material-ui/core/Modal";
import Upload from "./Upload";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PublishIcon from "@material-ui/icons/Publish";
function UploadField() {
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(false);
  };
  return (
    <div className="uploadfield">
      <div className="upload">
        <div style={{ display: "flex" }} onClick={() => setModal(true)}>
          <PublishIcon style={{ color: "#0ff295" }} />
          <h3 style={{ color: "#0ff295" }}> Upload </h3>
        </div>
        <Modal ref={null} open={modal} onClose={handleClick} style={{}}>
          <>
            <Upload toggle={setModal} />
          </>
        </Modal>
      </div>
      <div className="upload">
        <ShowChartIcon style={{ color: "#9ce1ff" }} />
        <h3 style={{ color: "#9ce1ff" }}>Analytics</h3>
      </div>
      <div className="upload">
        <ShuffleIcon style={{ color: "#ffffff" }} />
        <h3 style={{ color: "#ffffff" }}>Shuffle</h3>
      </div>
    </div>
  );
}

export default UploadField;
