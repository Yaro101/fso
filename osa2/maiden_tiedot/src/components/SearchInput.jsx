function SearchInput(props) {
  return (
    <div>
        Search Countries
      <input
        type="text"
        value={props.value}
        onChange={props.handleInputChange}
      />
    </div>
  );
}
export default SearchInput;
