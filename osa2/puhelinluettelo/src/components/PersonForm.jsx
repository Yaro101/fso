function Input(props){
    return (
        <input value={props.value} onChange={props.onChange} />
    )
}

function PersonForm(props) {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <Input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <Input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type='text'>add</button>
      </div>
    </form>
  );
}

export default PersonForm;
