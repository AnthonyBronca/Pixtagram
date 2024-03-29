const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const GET_ONE_POST = "post/GET_ONE_POST";
// const CREATE_POST = "post/CREATE_POST";
// const EDIT_POST = "user/EDIT_POST";
const DELETE_POST = "post/DELETE_POST";

const ADD_LIKE = "post/ADD_LIKE";


const getAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  payload: posts,
});

const getOnePost = (post) => ({
  type: GET_ONE_POST,
  payload: post,
});

const addLike = (post) => {
  return {
    type: ADD_LIKE,
    payload: post,
  };
};


const deletePost = (post) => ({
  type: DELETE_POST,
  payload: post,
});

export const getAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  if (response.ok) {
    const posts = await response.json();
    // console.log(posts, "posts from the thunk!");
    dispatch(getAllPosts(posts));
  }
  return response;
};

export const getOnePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const post = await response.json();
    dispatch(getOnePost(post));
    return post;
  }
  return response;
};

export const addLikeThunk = (post_id, user_id) => async (dispatch) => {
  const options = {
    method: "PUT",
  };
  const response = await fetch(`/api/posts/${post_id}/${user_id}`, options);
  const post = await response.json();
  // console.log(post)
  dispatch(addLike(post));
};

export const removeLikeThunk = (post_id, user_id) => async (dispatch) => {
  // console.log("you've hit removeLikeThunk!")
  const options = {
    method: "PUT",
  };
  const response = await fetch(
    `/api/posts/${post_id}/${user_id}/remove`,
    options
  );
  // const post = await response.json()

  // dispatch(addLike(post))
};

// create post
export const createPostThunk = (userId, form) => async (dispatch) => {
  const { img_url, caption } = form;
  const formData = new FormData();

  formData.append("img_url", img_url);
  formData.append("caption", caption);

  const option = {
    method: "POST",
    body: formData,
  };
  const response = await fetch(`/api/posts/${userId}/new`, option);
  if (response.ok) {
    const post = await response.json();
    dispatch(getOnePost(post));
    return post;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {

      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
};

// Edit Post Thunk
export const editPostThunk = (postId, form) => async (dispatch) => {
  const { caption } = form;
  const formData = new FormData();

  formData.append("caption", caption);

  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  };

  const response = await fetch(`/api/posts/${postId}/edit`, option);
  if (response.ok) {
    const post = await response.json();
    dispatch(getOnePost(post));
    return post;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
  return response;
};

// Delete Post Think
export const deletePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(deletePost(post));
  }
  return response;
};

const initialState = {};

export default function posts(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      newState["allPosts"] = action.payload;
      return newState;
    case GET_ONE_POST:
      newState = { ...state };
      newState.post = action.payload;
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState.post;
      return newState;
    default:
      return state;
  }
}
