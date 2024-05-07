import React from "react";

function Persons(props) {
  return (
    <div>
      {props.filteredPersons.map((person) => (
        <li key={person.id}>
          <span className="contact">
            {person.name}: {person.number}
          </span>
          <button
            className="add-del"
            onClick={() => props.onDelete(person.id, person.name)}
          >
            delete
          </button>
        </li>
      ))}
    </div>
  );
}
export default Persons;
