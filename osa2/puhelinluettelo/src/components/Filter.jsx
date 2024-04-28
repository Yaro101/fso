function Filter(props) {
  return (
    <div>
      Filter Shown with
      <input type={props.type}
             value={props.value}
             onChange={props.onChange} />
    </div>
  )
}

export default Filter;
