import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { deletePostThunk } from "../../store/post";
import "./post.css";
function PostModal({ postId, show }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [delModal, setDelModal] = useState(false);

  const openDelModal = (e) => {
    setDelModal(true);
  };

  const deletePost = (e) => {
    dispatch(deletePostThunk(postId));
    if (pathname === "/") {
      window.location.reload();
    } else history.push('/');
  };

  return (
    <>
      {delModal && (
        <div className="editPostModal">
          <div className="deletePostConfirmText">
            <h3>Delete post</h3>
            <p className="confirmdeltext">
              Are you sure you want to delete this post?
            </p>
          </div>
          <div className="delPostBtnFinal" onClick={deletePost}>
            Delete
          </div>
        </div>
      )}
      {!delModal && (
        <div className="editPostModal">
          <div className="delPostBtn" onClick={openDelModal}>
            Delete
          </div>
          <div
            onClick={() => history.push(`/posts/${postId}/edit`)}
            className="editPostButton"
          >
            Edit
          </div>
        </div>
      )}
    </>
  );
}

export default PostModal;
