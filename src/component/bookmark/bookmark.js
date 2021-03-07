import React from "react";
import { Link } from "react-router-dom";
import "./bookmark.css";
import BookmarkContext from "../../BookmarksContext";
import Rating from "../rating/rating";
import config from "../../config";

function deleteBookmarkRequest(bookmarkId, cb) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${config.API_KEY}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => Promise.reject(error));
      }
      return res.json();
    })
    .then((data) => {
      cb(bookmarkId);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function Bookmark(props) {
  return (
    <BookmarkContext.Consumer>
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
        <button
          className="BookmarkItem__buttons"
          onClick={() =>
            deleteBookmarkRequest(props.bookmarkId, this.context.deleteBookmark)
          }
        >
          Delete
        </button>
        <Link to={`/edit/${props.id}`}>Edit Bookmark</Link>
      </li>
    </BookmarkContext.Consumer>
  );
}
