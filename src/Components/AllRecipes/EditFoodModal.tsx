import * as React from "react";
import APIURL from '../../helpers/environment';
import { Modal, ModalBody, ModalHeader, Form, Input } from "reactstrap";
import { CreateFood } from "../Food/Food.interface";
import { CurrentEditingFood } from "./RecipeIndex";

interface EditFoodModalProps {
  sessionToken: string;
  isFoodModalOpen: boolean;
  toggleFoodModal: () => void;
  myFoodArray: {
    recipeName: string;
    category: string;
    recipeURL: string;
    imgURL: string;
    rating: string;
    id: string;
  }[];
  currentEditingFood: CurrentEditingFood;
}

interface EditFoodModalState {
  modal: boolean;
  editRating: string;
  createFood: CreateFood;
}

class EditFoodModal extends React.Component<
  EditFoodModalProps,
  EditFoodModalState
> {
  constructor(props: EditFoodModalProps) {
    super(props);
    this.state = {
      editRating: "",
      modal: false,
      createFood: {} as CreateFood,
    };
  }
  handleFoodEdit = async () => {
    fetch(`${APIURL}/food/${this.props.currentEditingFood.id}`, {
      method: "PUT",
      body: JSON.stringify({ rating: ~~this.state.editRating }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then(()=> this.props.toggleFoodModal())
      .catch((err) => console.error(err));
  };
  handleFoodDelete = () => {
    fetch(`${APIURL}/food/${this.props.currentEditingFood.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then (()=> this.props.toggleFoodModal())
    .catch((err) => {
      alert(err.message)
      console.error(err)});
      console.log(this.props.currentEditingFood)
  };
  reload=()=>window.location.reload()
  render() {
    const food = this.props.currentEditingFood;
    return (
      <div>
        <Modal
        onExit={this.reload}
          isOpen={this.props.isFoodModalOpen}
          toggle={this.props.toggleFoodModal}>
          <ModalHeader toggle={this.props.toggleFoodModal}></ModalHeader>
          <ModalBody>
            <h3>{food.recipeName}</h3>
            <h4>Main Ingredient: {food.category}</h4>
            <br />
            <a href={food.recipeURL}>Link to recipe</a>
            <br />
            <br />
            <img
              src={food.imgURL}
              alt={food.recipeName}
              height="100px"
              width="100px"
            />
            <h3>Old Rating: {food.rating}</h3>
            <Form>
              <br />
              <Input
                onChange={(e) => this.setState({ editRating: e.target.value })}
                placeholder="Rating"
              />
            </Form>
              <button onClick={()=>this.handleFoodEdit()}>Click to Change Rating</button>
              <button onClick={this.props.toggleFoodModal}>Cancel</button>
              <button onClick={()=>       console.log(this.props.currentEditingFood)}>Delete</button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditFoodModal;
