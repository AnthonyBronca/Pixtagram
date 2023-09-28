import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Splash.css";
import { getUserThunk } from "../../store/user";
import { dotDotDotIcon } from "./SplashIcons";
import { addLikeThunk, getAllPostsThunk, removeLikeThunk } from "../../store/post";
import LoadingSpinner from "../Spinner/Spinner";
import { NavLink } from "react-router-dom";
import checkmark from "../CheckMark/checkmark.png";
import SplashComments from "./SplashComments";
import PostModal from "../Post/PostModal";
import Likes from "./Likes";
import LikesModal from "../Post/LikesModal";

function Splash() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.session.user.id);
  const posts = useSelector((state) => state?.posts?.allPosts?.posts);

  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [currPost, setCurrPost] = useState()

  const [postForViewLikes, setPostForViewLikes] = useState()

  useEffect(() => {
    dispatch(getUserThunk(id)).then(() => dispatch(getAllPostsThunk()));
  }, [dispatch]);


  if (!id) {
    return <Redirect to="/login" />;
  }


  const openPeopleLikes = (postId, post) => {
    setCurrPost(postId)
    setShowLikes(true);
    setPostForViewLikes(post)
  };

  const openPostOptions = (e, postId) => {
    setCurrPost(postId)
    setShowPostOptions(true);
  };
  return (
    <>
        {showPostOptions && (
          <>
            <div className="backgroundFeed">
              <div className="postOptionsModalFeed">
                <div
                  onClick={() => setShowPostOptions(false)}
                  className="postOptionsModalBckgFeed"
                ></div>
                <div className="actualModalComponentFeed">
                  <PostModal
                    postId={currPost}
                    show={showPostOptions}
                  />
                  <div
                    className="cancelPostButtonFeed"
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
                  <LikesModal
                    views={postForViewLikes}
                    show={showLikes}
                  />
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

      <div className="stories-container"></div>
      <div className="feed">
        {posts ? (
          posts?.map((post, idx) => (
            <div key={idx}>
              <div className="post-card-feed">
                <div className="user-profile-info-feed">
                  <div className="user-profile-info">
                    <NavLink to={`/users/${post.user.id}`}>
                      <img
                      alt="user"
                        src={post.user.profile_pic_url}
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "50px",
                        }}
                        className="user-profile-pic-feed"
                      ></img>
                    </NavLink>
                    <NavLink
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                      to={`/users/${post.user.id}`}
                    >
                      {post.user.username}
                      {post.user.verified ? (
                        <img alt="verified" style={{ height: "15px" }} src={checkmark}></img>
                      ) : null}
                    </NavLink>
                  </div>

                  {id === post.user.id && (
                    <>
                      <div
                        className="dotdotdot"
                        onClick={(e) => openPostOptions(e, post.id)}
                      >
                        {dotDotDotIcon}
                      </div>
                    </>
                  )}
                </div>
                <div className="feed-post-image">
                  <NavLink
                    style={{ color: "white", fontWeight: "bold" }}
                    to={`/posts/${post.id}`}
                  >
                    <img alt="user" className="user-post-image" src={post.img_url}></img>
                  </NavLink>
                </div>

                <div className="bottom-post-feed">
                  <div>
                    <Likes post={post} sessionId={id}/>
                    {Object.keys(post.post_likes).length === 1 && (

                    <div className="feedHowManyLikes" onClick={() => openPeopleLikes(post.id, post)}>1 like</div>
                    )}
                    {Object.keys(post.post_likes).length > 1 && (
                    <div className="feedHowManyLikes" onClick={() => openPeopleLikes(post.id, post)}>{Object.keys(post.post_likes).length} likes</div>
                    )}
                  </div>

                  <div className="opinionsBox">
                    <div className="post-caption-feed">
                      <NavLink
                        id="id-nav"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textDecoration: "none",
                          marginRight: "15px",
                        }}
                        to={`/users/${post.user.id}`}
                      >
                        {post.user.username}
                        {post.user.verified ? (
                          <img alt="verified" style={{ height: "15px" }} src={checkmark} />
                        ) : null}
                      </NavLink>
                      {post.caption}
                    </div>

                    <div id="splash-comment-container">
                      <SplashComments post={post} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}

export default Splash;
