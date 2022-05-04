const Header = ({ course }: { course: string }) => <h1>{course}</h1>

const Total = ({ sum }: { sum: number }) => <p>Number of exercises {sum}</p>

const Content = ({parts} : { parts : CourseParts[]}) => 
  <>
    <p>
      {parts[0].name}  {parts[0].exerciseCount}
    </p>
    <p>
      {parts[1].name}  {parts[1].exerciseCount}
    </p>
    <p>
      {parts[2].name}  {parts[2].exerciseCount}
    </p>     
  </>

interface CourseParts {
  name: string;
  exerciseCount: number;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts : CourseParts[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header course={courseName} />
      <Content parts={courseParts} />
      <Total sum={courseParts[0].exerciseCount + courseParts[1].exerciseCount + courseParts[2].exerciseCount} />
    </div>
  );
};

export default App;