import * as React from 'react';
 interface SignupProps {
  updateLocalStorage: (newToken: string) => void

 }
  
 interface SignupState {
    firstName: string,
    lastName: string,
    email: string,
    password: string
 }
  
 class Signup extends React.Component<SignupProps, SignupState> {
     constructor(props: SignupProps) {
         super(props);
         this.state = { firstName: "", lastName: "", email: "", password: "" };
     }
     handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        fetch("http://localhost:4000/user/register", {
            method: "POST",
            body: JSON.stringify({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
        })
        .then((res) => res.json())
        .then((data) => this.props.updateLocalStorage(data.sessionToken))
        .catch((err) => console.error(err));
      }        
     
     render() {
        
         return ( <div>
            <h1>Signup</h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="firstName">First Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter your first name"
                value={this.state.firstName}
                onChange = {(e:any)=> this.setState({firstName: e.target.value})}
              />
              <br />
              <label htmlFor="lastName">Last Name</label>
              <br />
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={this.state.lastName}
                onChange = {(e:any)=> this.setState({lastName: e.target.value})}
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                value={this.state.email}
                placeholder="Enter an email address"
                onChange = {(e:any)=> this.setState({email: e.target.value})}
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                value={this.state.password}
                placeholder="Enter a password"
                minLength={5}
                onChange = {(e:any)=> this.setState({password: e.target.value})}
              />
              <br />
              <button type="submit" className='signup'>Submit Signup</button>
            </form>
          </div> );
     }
 }
  
 export default Signup;