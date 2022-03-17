import * as React from "react";
import APIURL from "../../helpers/environment";
import { Modal, ModalBody, ModalHeader, Table, Form, Input } from "reactstrap";

interface GetAllUsersProps {
  sessionToken: string;
}

interface GetAllUsersState {
  GetAllUsersArray: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    id: string;
  }[];
  newEmail: string;
  newRole: string;
  newPassword: string;
  confirmPassword: string;
  currentUpdatingUser: CurrentUpdatingUser;
  isUserModalOpen: boolean;
  userModal: boolean;
}

export interface CurrentUpdatingUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  id: string;
}

class GetAllUsers extends React.Component<GetAllUsersProps, GetAllUsersState> {
  constructor(props: GetAllUsersProps) {
    super(props);
    this.state = {
      GetAllUsersArray: [
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
          id: "",
        },
      ],
      newEmail: "",
      newRole: "",
      newPassword: "",
      confirmPassword: "",
      currentUpdatingUser: {} as CurrentUpdatingUser,
      isUserModalOpen: false,
      userModal: false,
    };
  }
  toggleUserModal = () => {
    this.setState({ isUserModalOpen: !this.state.isUserModalOpen });
  };
  fetchGetAllUsers = () => {
    fetch(`${APIURL}/admin/users`, {
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
      return this.state.GetAllUsersArray.length > 0 ? (
        <tr key={index}>
          <td scope="row">{users.id}</td>
          <td>{users.firstName}</td>
          <td>{users.lastName}</td>
          <td>{users.email}</td>
          <td>{users.role}</td>
          <td>
            <button
              onClick={() =>
                this.setState({
                  isUserModalOpen: true,
                  currentUpdatingUser: users,
                })
              }
            >
              Update User
            </button>
          </td>
        </tr>
      ) : null;
    });
  };
  handleUserUpdate = async () => {
    fetch(`${APIURL}/admin/users/${this.state.currentUpdatingUser.id}`, {
      method: "PUT",
      body: JSON.stringify({ email: this.state.newEmail, role: this.state.newRole, password: this.state.newPassword }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then(() => this.toggleUserModal())
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };
  handleUserDelete = () => {
    debugger;
    fetch(`${APIURL}/admin/users/${this.state.currentUpdatingUser.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.toggleUserModal());
  };

  componentDidMount() {
    this.fetchGetAllUsers();
  }
  reload = () => window.location.reload();
  render() {
    const user = this.state.currentUpdatingUser;
    return (
      <div>
        <h3 className="title">Current Users</h3>
        <Table>
          <thead>
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>View</th>
          </thead>
          <tbody>{this.displayGetAllUsers()}</tbody>
        </Table>
        <Modal
          onExit={this.reload}
          isOpen={this.state.isUserModalOpen}
          toggle={this.toggleUserModal}
        >
          <ModalHeader toggle={this.toggleUserModal}></ModalHeader>
          <ModalBody>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <h5>{user.email}</h5>
            <br />
            <Form>
              <br />
              <p>Update User Email</p>
              <Input
                onChange={(e) => this.setState({ newEmail: e.target.value })}
                type="email"
                placeholder="New Email"
              />
              <p>Update User Role</p>
              <Input
                onChange={(e) => this.setState({ newRole: e.target.value })}
                type="select">
                <option value="" disabled selected>Choose a New Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Input>
              <p>Update User Password</p>
              <Input
                onChange={(e) => this.setState({ newPassword: e.target.value })}
                type="password"
                placeholder="New Password"
              />
              <Input
                type="password"
                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                placeholder="Confirm Password"
              />
            </Form>
            <button
              onClick={() => {
                this.state.newPassword === this.state.confirmPassword
                  ? this.handleUserUpdate()
                  : alert("Passwords do not match");
              }}
            >
              Click to Update User
            </button>
            <button onClick={this.toggleUserModal}>Cancel</button>
            <button onClick={() => this.handleUserDelete()}>Delete User</button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default GetAllUsers;
