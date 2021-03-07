import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import config from "./config";
import AddBookmark from "./component/addBookmark/AddBookmark";
import BookmarkApp from "./component/bookmarkApp/bookmarkApp";
import BookmarksContext from "./BookmarksContext";
import EditBookmark from "../src/component/EditBookmark/EditBookmark";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false,
    };
  }

  setBookmarks = (bookmarks) => {
    this.setState({
      bookmarks,
      showAddForm: false,
    });
  };

  setShowAddForm(show) {
    this.setState({
      showAddForm: show,
    });
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false,
    });
  }

  deleteBookmark = (bookmarkId) => {
    const newBookMarks = this.state.bookmarks.filter(
      (bm) => bm.bookmarkId !== bookmarkId
    );
    this.setState({
      bookmarks: newBookMarks,
    });
  };

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        // Add your key after Bearer
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    };

    fetch(config.API_ENDPOINT, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res.json();
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          bookmarks: data,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }
  render() {
    const contextValue = {
      bokomarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
    };

    const page = "";
    <main className="App">
      <Route
        path="/add-bookmark"
        render={() => (
          <AddBookmark
            showForm={(show) => this.setShowAddForm(show)}
            handleAdd={(bookmark) => this.addBookmark(bookmark)}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <BookmarkApp
            bookmarks={this.state.bookmarks}
            showForm={(show) => this.setShowAddForm(show)}
          />
        )}
      />
      <Route path="/edit/:bookmarkId" component={EditBookmark} />
    </main>;
    return <div className="App">{page}</div>;
  }
}

export default App;
