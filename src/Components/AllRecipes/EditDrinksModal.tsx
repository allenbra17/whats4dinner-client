import * as React from "react";
import APIURL from '../../helpers/environment';
import { Modal, ModalBody, ModalHeader, Form, Input } from "reactstrap";
import { CreateDrinks } from "../Drinks/Drinks.interface";
import { CurrentEditingDrink } from "./RecipeIndex";

interface EditDrinksModalProps {
  sessionToken: string;
  isDrinkModalOpen: boolean;
  toggleDrinkModal: () => void;
  myDrinksArray: {
    cocktailName: string;
    mainIngredient: string;
    cocktailURL: string;
    imgURL: string;
    rating: string;
    id: string;
  }[];
  currentEditingDrink: CurrentEditingDrink;
}

interface EditDrinksModalState {
  modal: boolean;
  editRating: string;
  createDrink: CreateDrinks;
}

class EditDrinksModal extends React.Component<
  EditDrinksModalProps,
  EditDrinksModalState
> {
  constructor(props: EditDrinksModalProps) {
    super(props);
    this.state = {
      editRating: "",
      modal: false,
      createDrink: {} as CreateDrinks,
    };
  }
  handleDrinkEdit = async () => {

    fetch(`${APIURL}/drinks/${this.props.currentEditingDrink.id}`, {
      method: "PUT",
      body: JSON.stringify({ rating: ~~this.state.editRating }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
    .then(()=> this.props.toggleDrinkModal())
    .catch((err) => {
      alert(err.message)
      console.error(err)});
  };
  handleDrinkDelete = async () => {
    try {
      const res = await
    fetch(`${APIURL}/drinks/${this.props.currentEditingDrink.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }
    )
  }catch (error) {
      alert( error )
      console.error(error)}
      ()=> this.props.toggleDrinkModal()
  };
  render() {
    const drinks = this.props.currentEditingDrink;
    return (
      <div>
        <Modal
        isOpen={true}
        toggle={this.props.toggleDrinkModal}>
          <ModalHeader toggle={this.props.toggleDrinkModal}></ModalHeader>
          <ModalBody>
            <h3>{drinks.cocktailName}</h3>
            <h4>Main Ingredient: {drinks.mainIngredient}</h4>
            <br />
            <a href={drinks.cocktailURL}>Link to recipe</a>
            <br />
            <br />
            <img
              src={drinks.imgURL}
              alt={drinks.cocktailName}
              height="100px"
              width="100px"
            />
            <h3>Old Rating: {drinks.rating}</h3>
            <Form>
              <br />
              <Input
                onChange={(e) => this.setState({ editRating: e.target.value })}
                placeholder="Rating"
              />
            </Form>
              <button onClick={()=> this.handleDrinkEdit()}>Click to Change Rating</button>
              <button onClick={this.props.toggleDrinkModal}>Cancel</button>
              <button onClick={()=> this.handleDrinkDelete()
}>Delete</button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditDrinksModal;
