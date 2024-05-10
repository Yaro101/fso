import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import DisplayResult from "./components/DisplayResult";
import '../src/App.css'

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      if (searchInput.trim() === "") {
        setSearchResult([]);
        setErrorMessage([""]);
        return;
      }

      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchInput}`
        );
        const countries = response.data;
        if (countries.length > 10) {
          setErrorMessage(
            "Too many matches, specify another filter."
          );
          setSearchResult([]);
        } else {
          const filteredCountries = countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchInput.toLocaleLowerCase())
          );
          setSearchResult(filteredCountries);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error fectching data", error);
        setErrorMessage("Error fetching data. Please try again later.");
        setSearchInput("");
      }
    };
    fetchCountryData();
  }, [searchInput]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <SearchInput
        type="text"
        value={searchInput}
        handleInputChange={handleInputChange}
      />
      <DisplayResult errorMessage={errorMessage} searchResult={searchResult} />
    </div>
  );
}

export default App;
