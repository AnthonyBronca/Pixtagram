// import { useDispatch } from "react-redux";
import "./post.css";

function LikesModal({ views }) {
  const likesArr = Object.values(views.post_likes);

  return (
    <>
      <h2 className="likesTitle">Likes</h2>
      <div className="usersLikesDiv">
        {likesArr.map((user, idx) => (
          <div key={idx} className="eachUsername">
            {user.username}
          </div>
        ))}
      </div>
    </>
  );
}

export default LikesModal;
