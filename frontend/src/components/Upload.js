import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./Upload.css";
import CloseIcon from "@material-ui/icons/Close";
import postDataService from "../services/post.service";
import { Redirect } from "react-router-dom";

function Upload(props) {
  const [redirect, setRedirect] = useState(false);

  const [imgPreview, setImagePreview] = useState(null);
  const [imgPre, setImagePre] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault()
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let form_data = new FormData();
    form_data.append("title", title);
    form_data.append("description", description);
    form_data.append("uploadFile", filePreview, filePreview.name);
    if (imgPre) {
      form_data.append("preview", imgPre, imgPre.name);
    }
    form_data.append("genre", genre);
    postDataService
      .uploadPost(form_data, config)
      .then((res) => {
        console.log(res);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModal = (e) => {
    e.preventDefault();
    props.toggle(false);
  };
  const handleTitle = (e) => {
    e.preventDefault();

    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    e.preventDefault();

    setDescription(e.target.value);
  };
  const handleGenre = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };
  const handleEvent = () => {
    document.getElementById("fileUpload").click();
    document
      .getElementById("fileUpload")
      .addEventListener("change", handleImageChange);
  };
  const handleFileEvent = () => {
    document.getElementById("r_fileUpload").click();
    document
      .getElementById("r_fileUpload")
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
    <div className="uploading">
      <CloseIcon
        className="cancel__btn"
        fontSize="large"
        onClick={handleModal}
      />
      <form action="" className="upload__form" onSubmit={handleSubmit}>
        <div className="form__left">
          <img className="form__imgpreview" src={imgPreview} alt="" />
          <input
            type="file"
            id="fileUpload"
            onChange={handleImageChange}
            hidden
          />

          <Button onClick={handleEvent} className="choose__btn">
            Preview(optional)
          </Button>
          {imgPreview ? (
            <Button
              className="form__removebtn"
              onClick={() => setImagePreview(null)}
            >
              Remove
            </Button>
          ) : null}
        </div>

        <div className="form__right">
          <input
            type="file"
            id="r_fileUpload"
            onChange={handleFileChange}
            hidden
          />
          {filePreview ? (
            <h3
              style={{
                color: "white",
                alignSelf: "center",
                marginBottom: "10px",
              }}
            >
              {filePreview.name}
            </h3>
          ) : null}
          <Button onClick={handleFileEvent} className="choosefile__btn">
            Choose File to Upload
          </Button>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitle}
          />
          <input
            type="text"
            placeholder="Description(optional)"
            onChange={handleDescription}
          />

          <select
            className="select__genre"
            onChange={handleGenre}
            placeholder="select Genre"
            value={genre}
          >
            <option>Select Genre</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="mp3/wav">Mp3/Wav</option>
            <option value="zip">Zip</option>
            <option value="pdf">Pdf</option>
            <option value="doc">Doc</option>
            <option value="text">Text</option>
            <option value="xml">Xml</option>
          </select>
          <Button type="submit" className="choose__btn1">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
