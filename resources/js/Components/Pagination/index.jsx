import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
  return (
    <ul className={`pagination pagination-sm justify-content-end mb-0 mt-4`}>
      {links?.map((link, i) => (
        <li
          className={`page-item ${link.url == null ? "disabled" : ""} ${
            link.active ? "active" : ""
          }`}
          key={i}
        >
          <Link
            href={link.url == null ? "#" : link.url}
            className="page-link"
            dangerouslySetInnerHTML={{ __html: link.label }}
          ></Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
