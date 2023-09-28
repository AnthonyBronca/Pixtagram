import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPostThunk, getOnePostThunk } from "../../store/post";
import "./modals.css";

function EditPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const user = useSelector((state) => state?.session?.user);
  const currPost = useSelector((state) => state?.posts?.post);

  const [caption, setCaption] = useState(currPost?.caption);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {

    let response = await dispatch(getOnePostThunk(postId));

    if (response.id === undefined) {
      history.push("/page-not-found");
    } else if (response.user_id !== user.id) {
      history.push(`/posts/${postId}`);
    } else {
      setCaption(response.caption);
      setIsLoaded(true);
    }

  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { caption };

    const data = await dispatch(editPostThunk(postId, form));

    if (data.errors) {
    } else {
      history.push(`/posts/${postId}`);
    }
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="outerClass">
        <div className="inner">
          <form onSubmit={handleSubmit} autoComplete="off" className="createPostForm">
            <div className="topCreatePostModal">
              <p>Edit post</p>
              <div className="shareButtonDiv">
                <button className="shareButton">Share</button>
              </div>
            </div>
            <div className="lowerpartModal">
              <div className="leftEdit">
                <img className="post-picture" src={currPost.img_url} alt='post'></img>
              </div>
              <div className="rightEdit">
                <div className="rightCreate">
                  <div className="userInfoNewPost">
                    <img
                    alt="user"
                      className="userInfoNewPostImg"
                      src={user.profile_pic_url}
                    />
                    {user.username}
                  </div>

                  <label>
                    <textarea
                      name="caption"
                      onChange={(e) => setCaption(e.target.value)}
                      value={caption}
                      placeholder="Write your caption..."
                    ></textarea>
                  </label>
                </div>
                <div className="cancelEdit">
                  <div
                    onClick={() => history.push(`/posts/${currPost.id}`)}
                    className="cancelEditBtn"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;
