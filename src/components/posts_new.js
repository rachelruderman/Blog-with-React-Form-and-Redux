import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'

class PostsNew extends Component {

  renderField(field){
    //the field param contains an eventhandler so it knows what input it's linked to
    return (
      <div className='form-group'>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        //this object contains a bunch of event handlers and props. The ... says ok, this is an object here, and I want all of the dif properties in this object to be communicated as props to the input tag
        />
      </div>
    )
  }

  render(){
    return (
      <form>
        <Field
          label='Title'
          name='title'
          //the purpose of the component property is to show a function that will return some amount of jsx that will appear on the screen.
          //no () on the helper function b/c the field componenet will call it
          component={this.renderField}
        />
        <Field
          label='Tags'
          name='tags'
          component={this.renderField}
        />
      </form>
    )
  }
}

//redux form takes a single argument, which is a function
export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew)

//you might want to show multiple forms in an app. By providing a unique string for the form property, we ensure that if we are showing multiple different forms a the smae time, redux form will handle them correctly (won't try to merge state from different forms into a single piece of state)
