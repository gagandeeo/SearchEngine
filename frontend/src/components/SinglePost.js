import React, { useEffect, useState } from "react";
import postDataService from "../services/post.service";
import "./SinglePost.css";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Redirect } from "react-router-dom";

function SinglePost(props) {
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState("");
  const [substr, setStr] = useState("");
  const [imgPreview, setImagePreview] = useState("");
  const [imgPre, setImagePre] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  useEffect(() => {
    const id = props.match.params.uploadId;
    postDataService
      .getSinglePost(id)
      .then((res) => {
        if (res.data.uploadFile) {
          const temp = res.data.uploadFile.split("/");
          setStr(temp[temp.length - 1]);
        }
        setData(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setGenre(res.data.genre);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    postDataService
      .deletePost(data.id)
      .then((res) => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let form_data = new FormData();
    form_data.append("title", title);
    form_data.append("description", description);
    if (filePreview) {
      form_data.append("uploadFile", filePreview, filePreview.name);
    }
    if (imgPre) {
      form_data.append("preview", imgPre, imgPre.name);
    }
    form_data.append("genre", genre);
    postDataService
      .updatePost(data.id, form_data, config)
      .then((res) => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEvent = () => {
    document.getElementById("singlefileUpload").click();
    document
      .getElementById("singlefileUpload")
      .addEventListener("change", handleImageChange);
  };
  const handleFileEvent = () => {
    document.getElementById("singler_fileUpload").click();
    document
      .getElementById("singler_fileUpload")
      .addEventListener("change", handleFileChange);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const selected = e.target.files[0];
    if (selected) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
      setImagePre(selected);
    }
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    const selected = e.target.files[0];
    if (selected) {
      setFilePreview(selected);
      setTitle(selected.name);
    } else {
      setFilePreview("");
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="singlepost">
      <form action="" className="singleupload__form" onSubmit={handleSubmit}>
        <div className="singleform__left">
          <img
            className="singleform__imgpreview"
            src={!imgPreview ? data.preview : imgPreview}
            alt=""
          />
          <input
            type="file"
            id="singlefileUpload"
            onChange={handleImageChange}
            hidden
          />

          <Button onClick={handleEvent} className="singlechoose__btn">
            Change Preview
          </Button>
          {imgPreview ? (
            <Button
              className="singleform__removebtn"
              onClick={() => setImagePreview(null)}
            >
              Remove
            </Button>
          ) : null}
        </div>

        <div className="singleform__right">
          <DeleteIcon
            onClick={handleDelete}
            fontSize="large"
            className="delete__icon"
          />
          <input
            type="file"
            id="singler_fileUpload"
            onChange={handleFileChange}
            hidden
          />
          <div
            style={{
              backgroundColor: "darkgray",
              marginBottom: "10px",
              alignItems: "center",
              justifyContent: "space-evenly",
              display: "flex",
              padding: "10px",
              textIndent: "12px",
            }}
          >
            <h3
              style={{
                color: "white",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              {substr}
            </h3>
          </div>
          <Button onClick={handleFileEvent} className="singlechoosefile__btn">
            Change File to Upload
          </Button>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder="Description(optional)"
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={genre}
            className="singleselect__genre"
            onChange={(e) => setGenre(e.target.value)}
            placeholder="select Genre"
          >
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="mp3/wav">Mp3/Wav</option>
            <option value="zip">Zip</option>
            <option value="pdf">Pdf</option>
            <option value="doc">Doc</option>
            <option value="text">Text</option>
            <option value="xml">Xml</option>
          </select>
          <Button type="submit" className="singlechoose__btn1">
            Update and Upload
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SinglePost;
