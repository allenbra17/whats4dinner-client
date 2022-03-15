import * as React from 'react';
import { ISignup } from './Signup.interface';
 interface SignupProps {
  updateLocalStorage: (newToken: string, adminStatus: string) => void

 }
  
 interface SignupState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
 }
  
 class Signup extends React.Component<SignupProps, SignupState> {
     constructor(props: SignupProps) {
         super(props);
         this.state = { firstName: "", lastName: "", email: "", password: "", role: "" };
     }
     handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        fetch(`${APIURL}/user/register`, {
            method: "POST",
            body: JSON.stringify({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, role: this.state.role}),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
        })
        .then((res) => res.json())
        .then((data: ISignup) => this.props.updateLocalStorage(data.sessionToken, data.user.role))
        .catch((err) => {
          alert(err.message)
          console.error(err)});
      }        
     
     render() {
        
         return ( <div>
            <h3>Signup</h3>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="firstName">First Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter your first name"
                value={this.state.firstName}
                onChange = {(e)=> this.setState({firstName: e.target.value})}
              />
              <br />
              <label htmlFor="lastName">Last Name</label>
              <br />
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={this.state.lastName}
                onChange = {(e)=> this.setState({lastName: e.target.value})}
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                value={this.state.email}
                placeholder="Enter an email address"
                onChange = {(e)=> this.setState({email: e.target.value})}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                value={this.state.password}
                placeholder="Enter a password"
                minLength={5}
                onChange = {(e)=> this.setState({password: e.target.value})}
              />
              <br />
              <button type="submit" className='signup'>Submit Signup</button>
            </form>
          </div> );
     }
 }
  
 export default Signup;