import express from 'express'
import { parseHttpBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = req.query.height as string
  const weight = req.query.weight as string
  if (!height || !weight)
    res.status(400).json({ error: 'malformatted parameters' })
  else
    try {
      res.json({
        weight: weight,
        height: height,
        bmi: parseHttpBmi(height, weight),
      })
    } catch (error) {
      res.status(400).json({ error: 'malformatted parameters' })
    }
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
