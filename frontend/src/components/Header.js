import React from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { searchParse } from "../redux/actions/parse";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Header(props) {
  const propTypes = {
    searchParse: PropTypes.func.isRequired,
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    const data = { term: e.target.value };
    props.searchParse(data);
  };

  return (
    <div className="header">
      <div className="header__left">
        <HomeIcon fontSize="large" className="header__home" />
      </div>
      <div className="header__right">
        <input type="text" onChange={handleSearchChange} />
        <SearchIcon
          style={{
            cursor: "pointer",
            marginRight: "10px",
            borderRadius: "20px",
            padding: "2px",
          }}
        />
      </div>
    </div>
  );
}

export default connect(null, { searchParse })(Header);
