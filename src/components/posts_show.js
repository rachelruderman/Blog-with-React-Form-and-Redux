import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPost, deletePost} from '../actions'
import {Link} from 'react-router-dom'
class PostsShow extends Component {

  componentDidMount(){
    //optional: if you did not want to eagerly refetch posts, could add conditional: if(!this.props.post)
    //this is provided to us by react router
    const {id} = this.props.match.params
    this.props.fetchPost(id)
  }

  onDeleteClick(){
    //could also use this.props.post.id, but make sure to add the conditional to make sure it's there. The params, however, will always have the id available
    const {id} = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
    //deletePost is an action creator, so we can call it from this.props
  }

  render(){
    const {post} = this.props

    if(!post){
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to='/'>Back to Index</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
          className='btn btn-danger pull-xs-right'>
          Delete Post
        </button>
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

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)
