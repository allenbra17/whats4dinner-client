import * as React from 'react';
//  interface DrinkCreateProps {
//      fetchDrinks: () => void
     
//  }
  
//  interface DrinkCreateState {
//     cocktailName: string,
//     mainIngredient: string,
//     cocktailURL: string,
//     imgURL: string

//  }
  
//  class DrinkCreate extends React.Component<DrinkCreateProps, DrinkCreateState> {
//      constructor(props: DrinkCreateProps) {
//          super(props);
//          this.state = {cocktailName: '',
//             mainIngredient: '',
//             cocktailURL: '',
//             imgURL: ''}
//      }
//      handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
//         e.preventDefault();

//         fetch("http://localhost:4000/drinks/create", {
//             method: "POST",
//             body: JSON.stringify({ cocktailName: this.state.cocktailName, mainIngredient: this.state.mainIngredient, cocktailURL: this.state.cocktailURL, imgURL: this.state.imgURL}),
//             headers: new Headers({
//               "Content-Type": "application/json",
//             }),
//         })
//         .then((res) => res.json())
//         .then((data) => {
//           this.props.fetchDrinks()
//         })
//         .catch((err) => console.error(err));
//     };
        
//      render() { 
// //          return ( 
             
// //           );
// //      }
// //  }
  
//  export default DrinkCreate;