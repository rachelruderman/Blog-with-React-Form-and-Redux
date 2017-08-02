export const FETCH_POSTS = 'fetch_posts'
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
