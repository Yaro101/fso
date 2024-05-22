import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    // console.log("Current value of persons: ", persons);
    personsService
      .getAll()
      .then((initialPhoneBook) => setPersons(initialPhoneBook))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const alreadyExist = persons.find(
      (person) => person.name === newName && person.number === newNumber
    );
    const existingPerson = persons.find((person) => person.name === newName);
    if (alreadyExist) {
      setNewNotification({
        message: `${newName} on jo tallennettu puhelinluetteloon`,
        type: "success",
      });
      setTimeout(() => setNewNotification(null), 3000);
    } else if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number wih a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            setNewNotification({
              message: `${newName}'s number updated successfully`,
              type: "success",
            });
            setTimeout(() => setNewNotification(null), 3000);
          })
          .catch((error) => {
            console.log("Error:", error);
            console.error("Error updating person:", error);
            setNewNotification({
              message: error.response.data.error,
              type: "error",
            });
            setTimeout(() => setNewNotification(null), 3000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsService
        .create(newPerson)
        .then((returnedPhoneBook) => {
          setPersons([...persons, returnedPhoneBook]);
          setNewName("");
          setNewNumber("");
          setNewNotification({
            message: `${newName} added successfully`,
            type: "success",
          });
          setTimeout(() => setNewNotification(null), 3000);
        })
        .catch((error) => {
          console.log("Error:", error);
          console.log(error.response.data.error);
          console.error("Error adding person:", error);
          setNewNotification({
            message: error.response.data.error,
            type: "error",
          });
          setTimeout(() => setNewNotification(null), 3000);
        });
    }
  };
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterValue(event.target.value);

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    if (confirmDelete) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNewNotification({
            message: `${newName} deleted successfully`,
            type: "success",
          });
          setTimeout(() => setNewNotification(null), 3000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setNewNotification({
              message: `${newName} no longer exist`,
              type: "error",
            });
            setTimeout(() => setNewNotification(null), 3000);
          } else {
            console.error("Error deleting person:", error);
            setNewNotification({
              message: error.response.data.error,
              type: "error",
            });
            setTimeout(() => setNewNotification(null), 3000);
          }
        });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={newNotification ? newNotification.message : null}
        type={newNotification ? newNotification.type : null}
      />

      <Filter type="text" value={filterValue} onChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
