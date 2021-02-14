import React from "react";
import axios from "axios";
import "./Post.css";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
function Post({ id, title, description, genre, preview, uploadFile }) {
  const handleDownload = () => {
    const temp = uploadFile.split("/");
    const temper = temp[temp.length - 1];
    axios({
      url: `${uploadFile}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${temper}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };
  return (
    <div className="post">
      <Link className="post__left" to={`/upload/${id}`}>
        <img
          src={
            preview
              ? preview
              : "https://ctt.trains.com/sitefiles/images/no-preview-available.png"
          }
          alt=""
        />
      </Link>
      <div className="post__right">
        <h3>
          Title: {title.length > 10 ? `${title.substr(0, 25)}...` : title}
        </h3>
        <h3>
          <LocalOfferIcon style={{ color: "#adc977" }} />
        </h3>
        <h3>Description: {description}</h3>
        <h3>Genre: {genre}</h3>
        <Button className="download__btn" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
}

export default Post;
