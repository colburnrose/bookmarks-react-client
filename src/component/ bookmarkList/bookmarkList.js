import React, { Component } from "react";
import Bookmark from "../bookmark/bookmark";
import PropTypes from "prop-types";
import BookmarksContext from "../../BookmarksContext";

class BookmarkList extends Component {
  static propTypes = {
    bookmarks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      })
    ),
  };

  static defaultProps = {
    bookmarks: [],
  };

  static contextType = BookmarksContext;

  render() {
    const { bookmarks } = this.context;

    bookmarks.map((bookmark) => <Bookmark key={bookmark.id} {...bookmark} />);
    return <div className="BookmarkList">{bookmarks}</div>;
  }
}

export default BookmarkList;
