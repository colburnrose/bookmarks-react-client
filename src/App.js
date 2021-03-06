import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import config from "./config";
import AddBookmark from "./component/addBookmark/AddBookmark";
import BookmarkApp from "./component/bookmarkApp/bookmarkApp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false,
    };
  }

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

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        // Add your key after Bearer
        Authorization: `Bearer ${config.API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    fetch(config.API_ENDPOINT, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
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
    const page = this.state.showAddForm ? (
      <Route
        path="/add-bookmark"
        render={() => (
          <AddBookmark
            showForm={(show) => this.setShowAddForm(show)}
            handleAdd={(bookmark) => this.addBookmark(bookmark)}
          />
        )}
      />
    ) : (
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
    );
    return <div className="App">{page}</div>;
  }
}

export default App;
