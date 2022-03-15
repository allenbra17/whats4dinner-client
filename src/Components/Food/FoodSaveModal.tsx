import * as React from "react";
import { CurrentSelectedFood } from "./FoodTable";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Input,
} from "reactstrap";
import { CreateFood } from "./Food.interface";

interface FoodSaveModalProps {
  currentSelectedFood: CurrentSelectedFood;
  isModalOpen: boolean;
  toggleModal: () => void;
  sessionToken: string;
}

interface FoodSaveModalState {
  recipeName: string;
  modal: boolean;
  rating: string;
  createFood: CreateFood;
}

class FoodSaveModal extends React.Component<
  FoodSaveModalProps,
  FoodSaveModalState
> {
  constructor(props: FoodSaveModalProps) {
    super(props);
    this.state = {
      recipeName: this.props.currentSelectedFood?.recipeName,
      modal: false,
      createFood: {} as CreateFood,
      rating: "",
    };
  }
  modalOpen = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.toggleModal();

    fetch(`${APIURL}food/create`, {
      method: "POST",
      body: JSON.stringify({
        recipeName: this.state.createFood.recipeName,
        category: this.state.createFood.category,
        recipeURL: this.state.createFood.recipeURL,
        imgURL: this.state.createFood.imgURL,
        rating: ~~this.state.rating,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
          <ModalHeader toggle={this.props.toggleModal}></ModalHeader>
          <ModalBody>
            <h2>{this.props.currentSelectedFood.recipeName}</h2>
            Category: {this.props.currentSelectedFood.category}
            <br />
            <a href={this.props.currentSelectedFood.recipeURL}>
              Link to recipe
            </a>
            <br />
            <br />
            <img
              src={this.props.currentSelectedFood.imgURL}
              alt={this.props.currentSelectedFood.recipeName}
              height="100px"
              width="100px"
            />
            <Form  onSubmit={this.handleSave}>
              <br />
              <Input
                onChange={(e) =>this.setState({ rating: e.target.value })}
                placeholder="Rating"
              />
              <button
                type="submit"
                onClick={() =>
                  this.setState({
                    createFood: {
                      recipeName: 
                        this.props.currentSelectedFood.recipeName,
                      recipeURL: this.props.currentSelectedFood.recipeURL,
                      imgURL: this.props.currentSelectedFood.imgURL,
                      category:
                        this.props.currentSelectedFood.category,
                    },
                  })
                }
              >
                Click to Save
              </button>
              <button onClick={this.props.toggleModal}>Cancel</button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FoodSaveModal;
