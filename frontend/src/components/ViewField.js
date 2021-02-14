import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./ViewField.css";
import postDataService from "../services/post.service";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import FilterListIcon from "@material-ui/icons/FilterList";
function ViewField(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await postDataService.getPost();
      setPosts(res.data.results);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const curentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setFilter(e.target.value);
  };
  return (
    <>
      {!props.term ? (
        <div className="viewfield">
          {curentPosts.map((po, key) => (
            <Post
              key={key}
              id={po.id}
              title={po.title}
              description={po.description}
              genre={po.genre}
              preview={po.preview}
              uploadFile={po.uploadFile}
            />
          ))}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <div className="viewfield">
          <div className="viefield__filter">
            <select
              className="select__filter"
              onChange={handleChange}
              placeholder="select Genre"
              value={filter}
            >
              <option value="title">Title</option>
              <option value="genre">Genre</option>
            </select>
            <FilterListIcon style={{ color: "aqua", marginLeft: "20px" }} />
          </div>
          {posts
            .filter((po) => {
              if (props.term === "") {
                return po;
              } else if (filter === "" || filter === "title") {
                if (po.title.toLowerCase().includes(props.term.toLowerCase())) {
                  return po;
                }
              } else if (filter === "genre") {
                if (po.genre.toLowerCase().includes(props.term.toLowerCase())) {
                  return po;
                }
              }
            })
            .map((po, key) => (
              <Post
                key={key}
                id={po.id}
                title={po.title}
                description={po.description}
                genre={po.genre}
                preview={po.preview}
                uploadFile={po.uploadFile}
              />
            ))}
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    term: state.parse.term.term,
  };
};
export default connect(mapStateToProps)(ViewField);
