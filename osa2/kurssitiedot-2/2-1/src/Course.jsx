const Header = (props) => {
    return <h1>{props.course.name}</h1>;
  };
  
  const Total = (props) => {
    return <p>Number of exercises {props.sumOfExercises}</p>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </>
    );
  };
  const Course = (props) => {
    const sumOfExercises = props.course.parts.reduce(
      (sum, part) => sum + part.exercises,
      0
    );
  
    return (
      <div id={props.course.id}>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
        <Total sumOfExercises={sumOfExercises} />
      </div>
    );
  };

  export default Course;