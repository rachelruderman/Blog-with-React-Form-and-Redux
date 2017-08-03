import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPost} from '../actions'

class PostsShow extends Component {

  componentDidMount(){
    //this is provided to us by react router
    const {id} = this.props.match.params
    this.props.fetchPost(id)
  }

  render(){
    const {post} = this.props
    if(!post){
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

//pulling only the posts from the application state
//first argument is application state, second argument is ownProps. It's the props that are going to the component
//we are always trying to fetch a particular id
//we need to know about the id that sits inside the url
function mapStateToProps({posts}, ownProps){
  return {post: posts[ownProps.match.params.id]}
  //now our component is only ever going to receive the one post we care about
}

export default connect(mapStateToProps, {fetchPost})(PostsShow)
