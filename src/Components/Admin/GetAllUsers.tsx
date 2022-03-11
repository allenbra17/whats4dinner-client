import * as React from 'react';
import { Button, Modal, ModalBody, ModalHeader, Table, Form, Input } from "reactstrap";


interface GetAllUsersProps {
    sessionToken: string
}
 
interface GetAllUsersState {
    GetAllUsersArray: {
        firstName:string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        id: string;
    }[]
    newRole: string;
    newPassword: string;
    currentUpdatingUser: CurrentUpdatingUser;
    isUserModalOpen: boolean;
    userModal: boolean
}

export interface CurrentUpdatingUser {
    firstName:string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    id: string;
}
 
class GetAllUsers extends React.Component<GetAllUsersProps, GetAllUsersState> {
    constructor(props: GetAllUsersProps) {
        super(props);
        this.state = { GetAllUsersArray:[{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            id: ""
        },
    ],
newRole: "",
newPassword: "",
currentUpdatingUser: {} as CurrentUpdatingUser,
isUserModalOpen: false,
userModal: false
        }
    }
    toggleUserModal = () => {
        this.setState({ isUserModalOpen: !this.state.isUserModalOpen });
      };
      fetchGetAllUsers = () => {
        fetch("http://localhost:4000/admin/users", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        })
          .then((res) => res.json())
          .then((GetAllUsersData) => {
            this.setState({ GetAllUsersArray: GetAllUsersData });
          });
      };
      displayGetAllUsers = () => {
        return this.state.GetAllUsersArray.map((users, index) => {
          return (
            <tr key={index}>
            <td scope="row">{users.id}</td>
            <td>{users.firstName}</td>
            <td>{users.lastName}</td>
            <td>{users.email}</td>
            <td>{users.role}</td>
            <td><Button onClick={() => this.setState({ isUserModalOpen: true, currentUpdatingUser: users })}>Update User</Button></td>
            </tr>
  
          )
        })}
        handlePasswordUpdate = async () => {

          fetch(`http://localhost:4000/admin/users/${this.state.currentUpdatingUser.id}`, {
            method: "PUT",
            body: JSON.stringify({ password: this.state.newPassword }),
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.sessionToken,
            }),
          })
          .then(()=> this.toggleUserModal())
          .catch((err) => console.error(err));
        };
        handleUserDelete = () => {
          debugger
          fetch(`http://localhost:4000/admin/users/${this.state.currentUpdatingUser.id}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.sessionToken,
            }),
          }).then (()=> this.toggleUserModal())
        };
      
    
    render() {
      const user = this.state.currentUpdatingUser 
        return (       
        <div className="tbl">
          <button onClick={this.fetchGetAllUsers}>Get All Users</button>
        <Table>
          <th>UserId</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th></th>
          <tbody>{this.displayGetAllUsers()}</tbody>
        </Table>
        <Modal
          isOpen={this.state.isUserModalOpen}
          toggle={this.toggleUserModal}>
          <ModalHeader toggle={this.toggleUserModal}></ModalHeader>
          <ModalBody>
            <h2>{user.firstName} {user.lastName}</h2>
            <h3>{user.email}</h3>
            <br />
            <Form>
              <br />
              <h3>Update User Password</h3>
              <Input
              type="password"
                onChange={(e) => this.setState({ newPassword: e.target.value })}
                placeholder="New Password"
              />
            </Form>
              <Button onClick={()=>this.handlePasswordUpdate()}>Click to Change Password</Button>
              <Button onClick={this.toggleUserModal}>Cancel</Button>
              <Button onClick={()=> this.handleUserDelete()}>Delete User</Button>
          </ModalBody>
        </Modal>

        </div>
   );
    }
}
 
export default GetAllUsers;