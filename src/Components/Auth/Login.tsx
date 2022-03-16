import * as React from 'react';
import APIURL from '../../helpers/environment';
import { ILoginResponse } from './Login.interface';

 interface LoginProps {
  updateLocalStorage: (newToken: string, adminStatus: string) => void

 }
  
 interface LoginState {
    email: string,
    password: string
 }
  
 class Login extends React.Component<LoginProps, LoginState> {
     constructor(props: LoginProps) {
         super(props);
         this.state = { email: "", password: "" };
     }
     handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        fetch(`${APIURL}/user/login`, {
            method: "POST",
            body: JSON.stringify({ email: this.state.email, password: this.state.password }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
        })
        .then((res) => res.json())
        .then((data:ILoginResponse) => this.props.updateLocalStorage(data.sessionToken, data.user.role))
        .catch((err) => {
          alert(err.message)
          console.error(err)});
      }        
     
     render() {
        
         return ( <div>
            <h3>Login</h3>
            <form onSubmit={this.handleSubmit}>
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
              <button className='signup' onClick={(e)=>console.log('click')}>Submit Login</button>
            </form>
          </div> );
     }
 }
  
 export default Login;