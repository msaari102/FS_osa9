import express from 'express';
import { parseHttpBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises as Array<string>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as string;
  if (!daily_exercises || !target) res.send({ error: 'parameters missing'}).status(400);
  let excercises : Array<number> = [];

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i])))
      res.send({ error: 'malformatted parameters'}).status(400);
    else excercises = excercises.concat(Number(daily_exercises[i]));
  }

  if ( !excercises || isNaN(Number(target))) {
    res.send({ error: 'malformatted parameters'}).status(400);
  }
  const answer = calculateExercises(excercises, Number(target));
  console.log(answer);
  res.json(answer);
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;
  if (!height || !weight)
    res.status(400).json({ error: 'malformatted parameters' });
  else
    try {
      res.json({
        weight: weight,
        height: height,
        bmi: parseHttpBmi(height, weight),
      });
    } catch (error) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



