// The Header componenr
const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

// Content component
const Content = ({ parts }) => {
  return (
    <div>
      <p>
        {parts[0].name} exercises = {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} exercises = {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} exercises = {parts[2].exercises}
      </p>
    </div>
  );
};

// Total component
const Total = ({ parts }) => {
  const totalExercises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
