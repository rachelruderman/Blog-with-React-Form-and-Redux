import {FETCH_POSTS} from '../actions'
import {FETCH_POST} from '../actions'
import _ from 'lodash'
//you don't need to specify a file if you're importing from index.js
//we're gonna default our state to be an object
//this function receives the previous state and an action
export default function(state = {}, action){
  switch(action.type){
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id')
    //we need to transform this response into an object where the id is the key value
    //we want to take an array of records, take a propeerty out of each record, and make an object out of that
    //I don't want to toss away all the previous posts I've already fetched; I want to add to my total state
    case FETCH_POST:
    //this says, take my existing state, and add to it
    // const post = action.payload.data
    // const newState = {...state }
    // //take the newState object and add this additional property of the postID and set that equal to the post
    // newState[post.id] = post
    //   return newState
    //the above is how we would do that in es5. with es6 we can do... (identical, but es6)
      return {...state, [action.payload.data.id]: action.payload.data}
    default:
      return state;
  }
  //we immediately catch the default case, iwhere we'l return the state object
}
