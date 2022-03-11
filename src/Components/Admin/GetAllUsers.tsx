import * as React from 'react';
import { Table } from "reactstrap";


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
            </tr>
  
          )
        })}
    
    render() { 
        return (       <div className="tbl">
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
        </div>
   );
    }
}
 
export default GetAllUsers;