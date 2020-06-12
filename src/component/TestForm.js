import React from 'react';
import axios from 'axios';
import forma from './forma.css';
class TestForm extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
  	name: '',
  	email: '',
  	message: ''
	}
	this.onNameChange = this.onNameChange.bind(this)
	this.onEmailChange = this.onEmailChange.bind(this)
	this.onMessageChange = this.onMessageChange.bind(this)
	this.handleSubmit.bind = this.handleSubmit.bind(this)
  }
   validateName(name){
            return name.length > 2;
			
   }
 
   validateEmail(email){
	    const emailRegex = /^[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}$/;
        return email.emailRegex;
		
        }
  
  onNameChange(e) {
            var val = e.target.value;
            var valid = this.validateName(val);
            this.setState({name: val, nameValid: valid});
        }
  onEmailChange(e) {
			var valu = e.target.value;
            var valid = this.validateEmail(valu);
            this.setState({email: valu, emailValid: valid});
  }

  onMessageChange(e) {
	this.setState({message: e.target.value})
  }
 
handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST", 
      url:"http://localhost:3002/send", 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })
  }
resetForm(){
    this.setState({name: '', email: '', message: ''})
  }
render() {
	   let nameReg = this.state.nameValid!=false?"":"Error";
	   let emailReg = this.state.emailValid!=false?"":"Error";
	return(
  	<div className="contact-form">
	<p className="info-form">Get in touch</p>
	<form  onSubmit={this.handleSubmit} method="POST">
  	<p><input type="text" name= "name" value={this.state.name} onChange={this.onNameChange} placeholder="Name" required/>
		<span>{nameReg}</span></p>
	<p><input type="email" name="email" value={this.state.email} onChange={this.onEmailChange} placeholder="E-mail" required/><span>{emailReg}</span></p>
    <textarea className="form-control"  name="text" value={this.state.message} onChange={this.onMessageChange} placeholder="Message"></textarea>
  	<button type="submit" className="s-button">Send</button>
  	</form>
  	</div>
	);
  }
  handleSubmit(e) {
}
  
}
 export default TestForm;