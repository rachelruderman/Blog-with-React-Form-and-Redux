export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_post'
export const FETCH_POST = 'fetch_post'
export const DELETE_POST = 'delete_post'

import axios from 'axios'
//purpose: to fetch a list of posts
//need to return an object
//that action (the object right here) has to have a type
//purpose: fetch a list of posts and return them to the reducer. it needs to reach out to the redux blog api (so it needs to make a network request -- we need reduxpromise to handle the async nature of the request, and axios to make the request)

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=PAPERCLIP1234'
//the key just needs to be unique
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)
  //we're making the axios request, we assign the request to the payload property of the action we're returning. The redux promise middleware will automatically resolve the request for us before it arrives in the reducer
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(values, callback){
  //we want to make sure the request is made with values from the form, so as a second argument we'll provide 'values'
  //only once the post has been made, we want to call the callback. We can do this by writing a promise. This says, after the first part has been successfully completed, call this function. For navigating
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback())
  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback())
  return {
    type: DELETE_POST,
    payload: id
    //just return the id, and then inside the reducer we can just delete that particular post
  }
}
