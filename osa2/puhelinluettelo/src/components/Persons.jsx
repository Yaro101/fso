function Persons(props){
    return(
        <div>
            {props.filteredPersons.map((person, index) => (
            <li key={index}>
              {person.name}: {person.number}
            </li>
          ))}
        </div>
    )
} 
export default Persons