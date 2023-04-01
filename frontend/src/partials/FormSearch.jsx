// import { useState } from 'react';
// import './styles.css';

// function FormSearch({ options, onSubmit }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearchChange = (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);

//     // Filter options based on search term
//     const filteredResults = options.filter((option) =>
//       option.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(filteredResults);
//   };

//   const handleOptionSelect = (selectedOption) => {
//     setSearchTerm(selectedOption);
//     setSearchResults([]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSubmit(searchTerm);
//   };

//   return (
//     <form className="form-search" onSubmit={handleSubmit}>
//       <h2 className="form-name">Search Form</h2>
//       <label className="form-label">
//         Search:
//         <input
//           className="form-input"
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </label>
//       {searchResults.length > 0 && (
//         <ul className="form-results">
//           {searchResults.map((result) => (
//             <li
//               key={result}
//               className="form-result"
//               onClick={() => handleOptionSelect(result)}
//             >
//               {result}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button className="form-submit" type="submit">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default FormSearch;

import { useState } from 'react';
import './styles.css';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { border } from '@mui/system';

function FormSearch({ options, onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter options based on search term
    const filteredResults = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleOptionSelect = (selectedOption) => {
    // Add or remove selected option from the list
    const isSelected = selectedOptions.includes(selectedOption);
    const updatedOptions = isSelected
      ? selectedOptions.filter((option) => option !== selectedOption)
      : [...selectedOptions, selectedOption];
    setSelectedOptions(updatedOptions);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedOptions);
  };

  return (
    <>
    
    <form className="form-search" onSubmit={handleSubmit}>
   
      <h2 className="form-name">Search Form</h2>
      < div className='border-solid rounded-md border-2 border-indigo-600 w-80 m-10'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, accusantium!
      </div>
      <label className="form-label">
        Search:
        <input
          className="form-input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </label>
      {searchResults.length > 0 && (
        <ul className="form-results">
          {searchResults.map((option) => (
            // <li
            //   key={result}
            //   className="form-result"
            //   onClick={() => handleOptionSelect(result)}
            // >
            //   {result}
            // </li>
            <label key={option} className="form-checkbox">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionSelect(option)}
            />
            {option}
          </label>
          ))}
        </ul>
      )}
     
      <button className="form-submit" type="submit">
        Submit
      </button>
    </form>

  </>
  );
}

export default FormSearch; 