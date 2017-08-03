import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions'
import _ from 'lodash'
import {Link} from 'react-router-dom'

class PostsIndex extends Component {
//this is called immediately after the component has shown up inside the DOM. Good for something you want to check exactly one time.
//React always eagerly loads itself as soon as it can. We're always going to end up with the component being loaded one time before we have the info fetched
  componentDidMount(){
    //this kicks off our data loading process
    this.props.fetchPosts()
  }
//here we'll map over our list of posts and make a li with each one
//remember, we're dealing with an object now so we need lodash's map function which has the ability to deal with objects
  renderPosts(){
    return _.map(this.props.posts, post => {
      return (
        <li className='list-group-item' key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      )
    })
  }
//returns an array

  render(){
    return (
      <div>
        <div className='text-xs-right'>
          <Link className='btn btn-primary' to='/posts/new'>
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

//whenevr we want to consume anything from application level state, we always define the mapStateToProps function
function mapStateToProps(state){
  return {posts: state.posts}
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex)

//wiring up an action creator with this syntax, instead of mapDispatchToProps, is completely identical in nature, so we still have access to this.props.fetchPosts inside of our component. However, there may be times when you want to have a separate function in case you want to do more logic
