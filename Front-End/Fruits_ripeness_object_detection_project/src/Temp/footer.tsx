// import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';

// class Footer extends Component {
//   state = {
//     name: 'Toqeer',
//     age: 32,
//     buttonColor: 'primary', // default color
//     textColor: 'danger',
   
//     inputValue: '', // State to store input value
//   };

//   handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     alert('Button clicked!');
//     console.log(event);
//   };

//   handleDoubleClick = () => {
//     alert('Button double-clicked!');
//   };

//   handleMouseEnter = () => {
//     console.log('Mouse entered footer area');
//     this.setState({ buttonColor: 'success', textColor: 'red' }); // Update button and text color
//   };

//   handleMouseLeave = () => {
//     console.log('Mouse left footer area');
//     this.setState({ buttonColor: 'primary', textColor: 'black' }); // Revert button and text color
//   };

//   handleCopy = () => {
//     alert('Content copied!');
//   };

//   handleKeyDown = (event: React.KeyboardEvent) => {
//     console.log(`Key pressed: ${event.key}`);
//   };

//   handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ inputValue: event.target.value.toUpperCase() }); // Convert input value to uppercase
//     console.log('Input value:', event.target.value);
//   };

//   render() {
//     const { buttonColor, textColor, inputValue, age } = this.state;
//     const user = true; // Simulating a logged-in user
//     const animal=['cat','dog','horse']
//     if (user) {
//       return (
//         <div
//           className="text-center"
//           onMouseEnter={this.handleMouseEnter}
//           onMouseLeave={this.handleMouseLeave}
//           onCopy={this.handleCopy} // Handle copy event
//           style={{ color: textColor }} // Dynamic text color
//         >
//             {animal.map(animal =>{

// return (
//     <p key={animal}>{animal} is a type of animal.</p>

// )
// })}
//           <input
//             type="text"
//             value={inputValue} // Display the inputValue from state
//             onChange={this.handleInputChange}
//             placeholder="Type something"
//           />
          
//           {/* Conditional rendering for age check */}
//           <p>{age === 32 ? 'Yes' : 'No'}</p>

//           <p>Hi, This is my Page. Come and participate!</p>

//           <Button
//             variant={buttonColor} // Dynamic button color
//             onClick={this.handleClick}
//             onDoubleClick={this.handleDoubleClick}
//             onKeyDown={this.handleKeyDown}
//             tabIndex={0} // Make the button focusable
//           >
//             Click Me!

//           </Button>
//           {/* Conditional rendering for animal */}
          
          
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <p>You are not logged in. Please log in to view this content.</p>
//         </div>
//       );
//     }
//   }
// }

// export default Footer;
