import React from "react";
import "./bookmark.css";

import Rating from "../rating/rating";

export default function Bookmark(props) {
  return (
    <li className="bookmark">
      <div className="bookmark__row">
        <h3 className="bookmark__title">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <div className="BookmarkItem__description">{props.description}</div>
      <button className="BookmarkItem__buttons">Delete</button>
    </li>
  );
}
