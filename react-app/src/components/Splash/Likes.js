import { likeHeartIcon } from "./SplashIcons";
import { likeHeartFilledIn } from "../Post/postIcons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addLikeThunk,
  getAllPostsThunk,
  removeLikeThunk,
} from "../../store/post";

function Likes({ post, sessionId }) {
  const dispatch = useDispatch();

  const [heartState, setHeartState] = useState(likeHeartIcon);

  useEffect(() => {
    if (Object.keys(post.post_likes).includes(`${sessionId}`)) {
      setHeartState(likeHeartFilledIn);
    }
  }, [post, sessionId]);

  async function likeAPost(e, postId, userId) {
    e.stopPropagation();
    setHeartState(likeHeartFilledIn);
    await dispatch(addLikeThunk(postId, userId));
    await dispatch(getAllPostsThunk());
  }

  async function removeLike(e, postId, userId) {
    e.stopPropagation();
    setHeartState(likeHeartIcon);
    await dispatch(removeLikeThunk(postId, userId));
    await dispatch(getAllPostsThunk());
  }

  const likeOrRemoveLike = (e, postId, userId) => {
    if (heartState === likeHeartIcon) {

      return likeAPost(e, postId, userId);
    } else if (heartState === likeHeartFilledIn) {
      return removeLike(e, postId, userId);
    }
  };

  return (
    <div className="likes-post-feed">
      <div
        className="heart-icon"
        style={{ width: "30px", cursor: "pointer" }}
        onClick={(e) => likeOrRemoveLike(e, post.id, sessionId)}
      >
        {heartState}
      </div>
    </div>
  );
}

export default Likes;
