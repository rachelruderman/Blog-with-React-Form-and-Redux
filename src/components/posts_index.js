import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions'

class PostsIndex extends Component {
//this is called immediately after the component has shown up inside the DOM. Good for something you want to check exactly one time.
//React always eagerly loads itself as soon as it can. We're always going to end up with the component being loaded one time before we have the info fetched
  componentDidMount(){
    //this kicks off our data loading process
    this.props.fetchPosts()
  }

  render(){
    return (
      <div>Posts Index</div>
    )
  }
}

export default connect(null, {fetchPosts})(PostsIndex)

//wiring up an action creator with this syntax, instead of mapDispatchToProps, is completely identical in nature, so we still have access to this.props.fetchPosts inside of our component. However, there may be times when you want to have a separate function in case you want to do more logic
