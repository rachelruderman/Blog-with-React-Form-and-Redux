import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'

class PostsNew extends Component {

  renderField(field){
    //the field param contains an eventhandler so it knows what input it's linked to
    //we can use destructuring to access properties on nested objects as well
    const {meta : {touched, error} } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        //this object contains a bunch of event handlers and props. The ... says ok, this is an object here, and I want all of the dif properties in this object to be communicated as props to the input tag
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
      //this meta.error property is automatically added to the field object from our validate function
      //by using the ternary expression, the errors won't appear until the user has focused the input and focused away. Trying to submit also automatically puts all fields into the touched state
    )
  }

  onSubmit(values){
    console.log(values)
  }

  render(){
    //connect helper was used to wire up additional properties to the component. reduxForm does the same, and gives it the prop of handleSubmit.
    //handleSubmit takes a look at the form, once redux decides that everything is a-okay and ready to be submitted, it passes it on to the callback function defined by the developer
    const {handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title'
          name='title'
          //the purpose of the component property is to show a function that will return some amount of jsx that will appear on the screen.
          //no () on the helper function b/c the field componenet will call it
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Post Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}
//this will be called automatically for us at certain points during the form's lifecycle; ie. when teh user tries to submit the form. It's given a single argument, an object, that includes all the values the user has entered into the form
function validate(values){
  //the name property and the property in the validate function must be identical for the errors to show up
  //the errors object starts out as completely empty
  const errors = {}
  //then we look at a property on the values object
  if(!values.title || values.title.length < 3){
  //add a property to the errors object
    errors.title = 'Enter a title that is at least 3 characters!'
  }
  if(!values.categories){
    errors.categories = 'Enter some categories'
  }
  if(!values.content){
    errors.content = 'Enter some content please'
  }
  //if the validate function returns an empty object, redux submits the form
  return errors;
}

//redux form takes a single argument, which is a function
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew)

//you might want to show multiple forms in an app. By providing a unique string for the form property, we ensure that if we are showing multiple different forms a the smae time, redux form will handle them correctly (won't try to merge state from different forms into a single piece of state)
