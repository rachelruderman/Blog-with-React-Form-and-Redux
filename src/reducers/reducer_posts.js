import {FETCH_POSTS} from '../actions'
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
    default:
      return state;
  }
  //we immediately catch the default case, iwhere we'l return the state object
}
