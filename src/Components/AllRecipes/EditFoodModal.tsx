import * as React from "react";
import { Button, Modal, ModalBody, ModalHeader, Form, Input } from "reactstrap";
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
    fetch(`http://localhost:4000/drinks/${this.props.currentEditingFood.id}`, {
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
    fetch(`http://localhost:4000/food/${this.props.currentEditingFood.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then (()=> this.props.toggleFoodModal())
  };
  render() {
    const food = this.props.currentEditingFood;
    return (
      <div>
        <Modal
          isOpen={this.props.isFoodModalOpen}
          toggle={this.props.toggleFoodModal}>
          <ModalHeader toggle={this.props.toggleFoodModal}></ModalHeader>
          <ModalBody>
            <h2>{food.recipeName}</h2>
            <h3>Main Ingredient: {food.category}</h3>
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
              <Button onClick={()=>this.handleFoodEdit()}>Click to Change Rating</Button>
              <Button onClick={this.props.toggleFoodModal}>Cancel</Button>
              <Button onClick={()=> this.handleFoodDelete()}>Delete</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditFoodModal;
