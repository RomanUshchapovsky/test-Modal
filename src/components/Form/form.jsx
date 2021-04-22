// import React from 'react';
// // import styled from 'styled-components';
// // const Button = styled.button
// const FormField2 = props => {
//   const hiddenFileInput = React.useRef(null);
  
//   const handleClick = event => {
//     hiddenFileInput.current.click();
//   };
//   const handleChange = event => {
//     const fileUploaded = event.target.files[0];
//     props.handleFile(fileUploaded);
//   };
//   return (
//     <>
//       <button onClick={handleClick}>
//         Upload a file
//       </button>
//       <input type="file"
//              ref={hiddenFileInput}
//              onChange={handleChange}
//              style={{display:'none'}} 
//       /> 
//     </>
//   );
// };
// export default FormField2;