import React from "react";
import "./Pagination.css";
function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <h3 key={number} onClick={() => paginate(number)}>
          {number}
        </h3>
      ))}
    </div>
  );
}

export default Pagination;
