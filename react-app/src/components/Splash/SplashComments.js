import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentThunk,
} from "../../store/comment";
import { NavLink } from "react-router-dom";
import { getAllPostsThunk } from "../../store/post";


import "./SplashComments.css";

function SplashComments({ post }) {
  const postId = post.id;
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);

  const comments = post.comments;

  const currUser = useSelector((state) => state?.session?.user?.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currUser;
    const form = { text };

    const comment = await dispatch(createCommentThunk(userId, postId, form));
    setText("");
    if (comment.errors) {
      setErrors(comment.errors);
    } else {
      await dispatch(getAllPostsThunk());
    }
  };

  return (
    <>
      {comments && (
        <>
          <div id="s-parent">
            {comments.length > 0 && (
              <>
                <div id="s-comment-container">
                  {comments.length === 1 && (
                    <>
                      <div id="username-comment">
                        <p id="s-username">
                          <NavLink
                            className="s-username"
                            to={`/users/${comments[0]?.user?.id}`}
                          >
                            {comments[0]?.user?.username}
                          </NavLink>
                        </p>

                        <p id="s-comment">
                          {comments[0]?.text}
                        </p>
                      </div>
                    </>
                  )}
                  {comments.length > 1 && (
                    <>
                      {comments.length > 2 && (
                        <div id="s-nav">
                          <NavLink id="navlink" to={`/posts/${postId}`}>
                            View all {comments?.length} comments
                          </NavLink>
                        </div>
                      )}

                      <div id="username-comment">
                        <p id="s-username">
                          <NavLink
                            className="s-username"
                            to={`/users/${comments[0]?.user?.id}`}
                          >
                            {comments[0]?.user?.username}
                          </NavLink>
                        </p>
                        <p id="s-comment">
                          {comments[0]?.text}
                        </p>
                      </div>
                      <div id="username-comment">
                        <p id="s-username">
                          <NavLink
                            className="s-username"
                            to={`/users/${
                              comments[comments.length - 1]?.user?.id
                            }`}
                          >
                            {comments[comments.length - 1]?.user?.username}
                          </NavLink>
                        </p>

                        <p id="s-comment">
                          {comments[comments.length - 1]?.text}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <div id="s-line"></div>
            <div id="s-comment-form">
              <form id="splash-comment-form" autoComplete="off" onSubmit={handleSubmit}>
                <input
                  id="s-input"
                  placeholder="Add a comment.."
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  name="text"
                  value={text}
                ></input>
                <button id="post-button" disabled={!text || text.length > 140}>
                  Post
                </button>
              </form>
              {errors && (
                <>
                  <div id="errors-render">
                    {errors.map((error, ind) => (
                      <div id="errors" key={ind}>
                        {error}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SplashComments;
