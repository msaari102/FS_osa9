const Header = ({ course }: { course: string }) => <h1>{course}</h1>;

const Total = ({parts} : { parts : CoursePart[]}) => {

  const total = parts.reduce( (s, p) => {
    return s + p.exerciseCount;
  },0);
  return (
    <b>Total of {total} exercises</b>
  );
};

const Content = ({parts} : { parts : CoursePart[]}) => {
return (
  <ul>
    {parts.map(part => <Part key={part.name} part={part} />)}
  </ul>
);};

  const Part = ({part} : { part : CoursePart}) => 
  {
    switch (part.type) {
      case "normal":
        return (
          <>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
          </>
        );
        break;
      case "groupProject":
        return (
          <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>
            project exercises {part.groupProjectCount}
          </p>
        </>
          
          );
      case "submission":
        return (
          <>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>
              {part.description}
            </p>
            <p>
              submit to {part.exerciseSubmissionLink}
            </p>
        </>
        );
        case "special":
          return (
            <>
              <h3>{part.name} {part.exerciseCount}</h3>
              <p>
                {part.description}
              </p>
              <p>
                required skills: {part.requirements.join(', ')}
              </p>
          </>
          );
      default:
        return (<p>Unkown part</p>);
    }
  };
  
  /*
  const Total = ({parts}) => {
    
  }
  */

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseReqPart extends CourseDescPart {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart |CourseReqPart;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
];

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header course={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;