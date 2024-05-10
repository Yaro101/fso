import React, { useState } from "react";

const DisplayResult = (props) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleViewClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseClick = (country) => {
    setSelectedCountry(null);
  };

  return (
    <div>
      {props.errorMessage && <p>{props.errorMessage}</p>}
      {props.searchResult.map((country, index) => (
        <div key={index}>
          <h2>{country.name.common}</h2>
          <button onClick={() => handleViewClick(country)}>View</button>
          {selectedCountry === country && (
            <div>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area} km²</p>
              <p>Languages:</p>
              <ul>
                {Object.values(country.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
              <img src={country.flags.png} alt={country.flags.alt} />
              <button onClick={handleCloseClick}>Close</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayResult;
