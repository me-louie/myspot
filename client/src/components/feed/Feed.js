import React from "react";
import { connect } from "react-redux";

import Post from "./Post";
import {
  toggleLike,
  fetchFeed,
  addPersonalPostsToFeed,
} from "../../app/actions/feedActions";

class Feed extends React.Component {
  componentDidMount = (id) => {
    // TODO: change "mikayla" with id once active user is set up
    this.props.fetchFeed("mikayla");
    this.props.addPersonalPostsToFeed("mikayla");
  };
  render() {
    const { toggleLike } = this.props;
    if (this.props.feed.posts) {
      return (
        <div>
          {/* <MakePost /> TODO */}
          {this.props.feed.posts.map((p) => (
            <Post
              key={p._id}
              postdata={p}
              // TODO: the userId's below will need to be set as the active user's id (username) eventually, just set it as me for now
              toggleLike={() =>
                toggleLike({ usersLiked: p.usersLiked, userId: "mikayla" })
              }
              userId={"mikayla"}
            />
          ))}
        </div>
      );
    } else {
      return <h1>Nothing to see here</h1>;
    }
  }
}

const mapStateToProps = (state) => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  toggleLike,
  fetchFeed,
  addPersonalPostsToFeed,
  // toggleActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
