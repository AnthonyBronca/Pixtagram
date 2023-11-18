import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { getOnePostThunk } from "../../store/post";
import { commentIcon } from "./postIcons";
import "./post.css";
import { dotDotDotIcon } from "../Splash/SplashIcons";
import LoadingSpinner from "../Spinner/Spinner";
import PostModal from "./PostModal";
import Comments from "../Comments/Comments";
import { createCommentThunk, getCommentsThunk } from "../../store/comment";
import checkmark from "../CheckMark/checkmark.png";
import PostLikes from "./PostLikes";
import LikesModal from "./LikesModal";

function Post() {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state?.posts?.post);
  //DID YOU ENCOUNTER AN ERROR?! TRY NPM INSTALL MOMENT --SAVE
  const currUser = useSelector((state) => state?.session?.user?.id);
  const currPost = useSelector((state) => state?.posts?.post?.id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);

  const [showLikes, setShowLikes] = useState(false);
  const [postForViewLikes, setPostForViewLikes] = useState();

  const { postId } = useParams();
  const userId = post?.user_id;


  useEffect(() => {

    let response = dispatch(getOnePostThunk(postId));

    // if (response.id === undefined) {
    //   history.push("/page-not-found");
    // }
    dispatch(getCommentsThunk(postId)).then(() => setIsLoaded(true));
  }, [isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postId = currPost;
    const userId = currUser;
    const form = { text };
    const comment = await dispatch(createCommentThunk(userId, postId, form));
    if (comment.errors) {
      setErrors(comment.errors);
    } else {
      await dispatch(getCommentsThunk(postId));
      setText("");

    }
  };

  const toProfile = (e) => {
    history.push(`/users/users/${post?.user?.id}`);
  };

  const openPostOptions = () => {
    setShowPostOptions(true);
  };

  const openPeopleLikes = (post) => {
    setShowLikes(true);
    setPostForViewLikes(post);
  };

  if (!isLoaded) {
    return (
      <>
        <div style={{ position: "relative", top: "400px", left: "55%" }}>
          <LoadingSpinner />
        </div>
      </>
    );
  } else {
    return (
      <>
        {showPostOptions && (
          <>
            <div className="background">
              <div className="postOptionsModal">
                <div
                  onClick={() => setShowPostOptions(false)}
                  className="postOptionsModalBckg"
                ></div>
                <div className="actualModalComponent">
                  <PostModal postId={postId} show={showPostOptions} />
                  <div
                    className="cancelPostButton"
                    onClick={() => setShowPostOptions(false)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showLikes && (
          <>
            <div className="backgroundFeed">
              <div className="postOptionsModalFeed">
                <div
                  onClick={() => setShowLikes(false)}
                  className="postOptionsModalBckgFeed"
                ></div>
                <div className="actualModalComponentFeed">
                  <LikesModal views={postForViewLikes} show={showLikes} />
                  <div
                    className="closeLikesModal"
                    onClick={() => setShowLikes(false)}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div id="parent">
          <div className="singlePostPage">
            <div className="postCard">
              <div className="left">
                <Link to={`/users/${post?.user?.id}`}>
                  <img
                    className="post-picture"
                    src={post?.img_url}
                    alt="post"
                  ></img>
                </Link>
              </div>
              <div className="right">
                <div className="user-info">
                  <NavLink to={`/users/${post?.user.id}`}>
                    <img
                      alt="user"
                      className="user-pic"
                      src={post?.user.profile_pic_url}
                    ></img>
                  </NavLink>

                  <a id="hide-me" href={`/users/${post?.user?.id}`}>
                    <span className="user-name">
                      {`${post?.user?.username}`}
                      {post?.user?.verified ? (
                        <img
                          style={{ height: "15px" }}
                          src={checkmark}
                          alt="verified"
                        />
                      ) : null}
                    </span>
                  </a>
                  {currUser === userId && (
                    <div className="postOptions">
                      <span onClick={openPostOptions}>{dotDotDotIcon}</span>
                    </div>
                  )}
                </div>
                <div className="comments">
                  <div className="user-caption">
                    <img
                      alt="user"
                      className="user-pic"
                      src={post?.user.profile_pic_url}
                    ></img>
                    <span className="user-name">
                      {post?.user?.username}
                      {post?.user?.verified ? (
                        <img
                          style={{ height: "15px" }}
                          src={checkmark}
                          alt="verified"
                        />
                      ) : null}
                    </span>
                    <p className="caption">{post?.caption}</p>
                  </div>
                  <div className="comment-section">
                    <Comments postId={postId} />
                  </div>
                </div>
                <div className="bottom-right">
                  <div></div>
                  <div className="p-line"></div>

                  <div className="post-icons">
                    <div>
                      <PostLikes post={post} sessionId={currUser} />
                    </div>

                    <div
                      className="comment-icon-post"
                    >
                      <label htmlFor="for-input-focus">{commentIcon}</label>
                    </div>
                  </div>
                  <div className="liked-by">
                    {Object.keys(post.post_likes).length === 0 && (
                      <div className="liked-by-line">Be the first to like</div>
                    )}
                    {Object.keys(post.post_likes).length === 1 && (
                      <div
                        className="liked-by-line"
                        onClick={() => openPeopleLikes(post)}
                      >
                        1 like
                      </div>
                    )}
                    {Object.keys(post.post_likes).length > 1 && (
                      <div
                        className="liked-by-line"
                        onClick={() => openPeopleLikes(post)}
                      >
                        {Object.keys(post.post_likes).length} likes
                      </div>
                    )}
                  </div>
                  <span id="date">{post?.days_since}</span>

                  <div className="p-line"></div>

                  <div>
                    {text.length > 140 && (
                      <div>
                        {errors.map((error, ind) => (
                          <div id="errors" key={ind}>
                            {error}
                          </div>
                        ))}
                      </div>
                    )}
                    <div id="form-container">
                      <form onSubmit={handleSubmit} autoComplete="off" id="comment-form">
                        <textarea
                          className="comment-form"
                          id="for-input-focus"
                          placeholder="Add a comment..."
                          type="text"
                          name="text"
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                          rows="2"
                          cols="28"
                        ></textarea>
                        <button disabled={!text} id="post-comment-button">
                          {" "}
                          Post{" "}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
