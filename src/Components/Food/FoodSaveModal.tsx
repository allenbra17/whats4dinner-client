import * as React from "react";
// import { CurrentSelectedFood } from "./FoodTable";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input, } from "reactstrap";
import { CreateFood } from "./Food.interface";

interface FoodSaveModalProps {
  // currentSelectedFood: CurrentSelectedFood;
  isModalOpen: boolean
  toggleModal: () => void
  SessionToken: string
}

interface FoodSaveModalState {
    // foodName: string;
    modal: boolean
    rating: number
    createFood: CreateFood
}

class FoodSaveModal extends React.Component<
  FoodSaveModalProps,
  FoodSaveModalState
> {
  constructor(props: FoodSaveModalProps) {
    super(props);
    this.state = {
      // foodName: this.props.currentSelectedFood?.foodName,
       modal: false, createFood: {} as CreateFood, rating: 0
    };
  }
  modalOpen = () => {
      console.log("click")
      this.setState({ modal: !this.state.modal})
      // console.log(this.props.currentSelectedFood.foodName)
  }
  render() {
    return (<div>


  <Modal isOpen={this.props.isModalOpen}
    toggle={this.props.toggleModal}
  >
    <ModalHeader toggle={this.props.toggleModal}>

    </ModalHeader>
    <ModalBody>
        
          {/* <h2>{this.props.currentSelectedFood.foodName}</h2>
        
          Main Ingredient:  {this.props.currentSelectedFood.mainIngredient}
          <br/>
          <a href={this.props.currentSelectedFood.foodURL}>Link to recipe</a>
          <br/>
          <br/>
          <img src={this.props.currentSelectedFood.imgURL} alt={this.props.currentSelectedFood.foodName} height="100px" width="100px"/> */}
          <Form>
                <br/>
          <Input
            onChange={(e) => this.setState({rating: e.target.valueAsNumber })} placeholder="Rating"/>
</Form>

    </ModalBody>
    <ModalFooter>
          {/* <button onClick ={()=> this.setState({ createFood: ({foodName: this.props.currentSelectedFood.foodName, foodURL: this.props.currentSelectedFood.foodURL, imgURL:this.props.currentSelectedFood.imgURL, mainIngredient: this.props.currentSelectedFood.mainIngredient, rating: this.state.rating})})}>Click to Save </button> */}
      {/* <Button
        color="primary"
        onClick={function noRefCheck(){}}
      >
        Do Something
      </Button>
      {' '}
      <Button onClick={function noRefCheck(){}}>
        Cancel
      </Button> */}
    </ModalFooter>
  </Modal>




        {/* <Button onClick={this.modalOpen}>Modal</Button>
      <Modal isOpen={this.state.modal} >
        <ModalBody>Modal Body */}
        {/* </ModalBody>
      </Modal> */}
      </div>
    );
  }
}

export default FoodSaveModal;
