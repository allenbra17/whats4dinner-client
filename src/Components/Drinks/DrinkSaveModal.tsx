import * as React from "react";
import { CurrentSelectedDrink } from "./DrinksTable";
import { Button, Modal, ModalBody, ModalHeader, Form, Input } from "reactstrap";
import { CreateDrinks } from "./Drinks.interface";

interface DrinkSaveModalProps {
  currentSelectedDrink: CurrentSelectedDrink;
  isModalOpen: boolean;
  toggleModal: () => void;
  sessionToken: string;
}

interface DrinkSaveModalState {
  drinkName: string;
  modal: boolean;
  rating: string;
  createDrink: CreateDrinks;
}

class DrinkSaveModal extends React.Component<
  DrinkSaveModalProps,
  DrinkSaveModalState
> {
  constructor(props: DrinkSaveModalProps) {
    super(props);
    this.state = {
      drinkName: this.props.currentSelectedDrink?.cocktailName,
      modal: false,
      createDrink: {} as CreateDrinks,
      rating: "",
    };
  }
  modalOpen = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.toggleModal();

    fetch("http://localhost:4000/drinks/create", {
      method: "POST",
      body: JSON.stringify({
        cocktailName: this.state.createDrink.cocktailName,
        mainIngredient: this.state.createDrink.mainIngredient,
        cocktailURL: this.state.createDrink.cocktailURL,
        imgURL: this.state.createDrink.imgURL,
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
        <Modal
          isOpen={this.props.isModalOpen}
          toggle={this.props.toggleModal}
        >
          <ModalHeader toggle={this.props.toggleModal}></ModalHeader>
          <ModalBody>
            <h2>{this.props.currentSelectedDrink.cocktailName}</h2>
            Main Ingredient: {this.props.currentSelectedDrink.mainIngredient}
            <br />
            <a href={this.props.currentSelectedDrink.cocktailURL}>
              Link to recipe
            </a>
            <br />
            <br />
            <img
              src={this.props.currentSelectedDrink.imgURL}
              alt={this.props.currentSelectedDrink.cocktailName}
              height="100px"
              width="100px"
            />
            <Form onSubmit={this.handleSave}>
              <br />
              <Input
                onChange={(e) => this.setState({ rating: e.target.value })}
                placeholder="Rating"
              />
              <Button
                type="submit"
                onClick={() =>
                  this.setState({
                    createDrink: {
                      cocktailName:
                        this.props.currentSelectedDrink.cocktailName,
                      cocktailURL: this.props.currentSelectedDrink.cocktailURL,
                      imgURL: this.props.currentSelectedDrink.imgURL,
                      mainIngredient:
                        this.props.currentSelectedDrink.mainIngredient,
                    },
                  })
                }
              >
                Click to Save
              </Button>
              <Button onClick={this.props.toggleModal}>Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DrinkSaveModal;
