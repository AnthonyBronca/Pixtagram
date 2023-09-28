// ms - should post be changed to comment? vvv
const GET_ALL_COMMENTS = "comment/GET_ALL_COMMENTS";
const CREATE_COMMENT = "comment/CREATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";
// const GET_ONE_COMMENT = "comment/GET_ONE_COMMENT";

// const getOneComment = comment => ({
//   type: GET_ONE_COMMENT,
//   payload: comment
// })

const getComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  payload: comments,
});


// Delete a Comment
const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});


// Get the Comments for a post
export const getCommentsThunk = (postId) => async (dispatch) => {

  const response = await fetch(`/api/comments/${postId}`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
  }
  return response;
};

// Create a Comment
export const createCommentThunk =
  (userId, postId, form) => async (dispatch) => {
    const { text } = form;

    const response = await fetch(`/api/comments/${postId}/${userId}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        postId,
        text,
      }),
    });

    if (response.ok) {
      const comment = await response.json();
      dispatch(getComments(comment));
      return comment;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred while creating a comment. Please Try again."];
    }
  };

// Delete a Comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(deleteComment(comment));
  }
  return response;
};

const initialState = {};

export default function comments(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_COMMENTS:
      newState = { ...state, ...action.payload };

      return newState;
    case CREATE_COMMENT:

      newState = { ...state.comments, [action.payload.id]: action.payload };
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState.comment;
      return newState;

    default:
      return state;
  }
}
