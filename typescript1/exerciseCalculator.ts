interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArgumentsArray = (
  args: Array<string>
): { array1: Array<number>; value2: number } => {
  if (args.length < 4) throw new Error('Not enough arguments')
  let answer: Array<number> = []
  let target: number

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i])) || Number(args[2]) < 0)
      throw new Error('Provided values were not numbers above zero!')
    else answer = answer.concat(Number(args[i]))
  }
  if (isNaN(Number(args[2])) || Number(args[2]) < 1 || Number(args[2]) > 3)
    throw new Error('Provided target is out of range 1-3')
  else target = Number(args[2])

  console.log(answer)

  return {
    array1: answer,
    value2: target,
  }
}

const calculateExercises = (array1: Array<number>, value2: number): Result => {
  let tDays = 0
  let average = 0
  let rating = 2
  let ratingDescription = 'not too bad but could be better'
  let success = false
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] > 0) tDays++
    average += array1[i]
  }
  average /= array1.length

  if (average < value2 * 0.75) {
    rating = 1
    ratingDescription = 'bad result, more exercise needed in next period'
  } else if (average >= value2) {
    rating = 3
    ratingDescription = 'excellent result'
  }
  if (rating >= value2) success = true

  return {
    periodLength: array1.length,
    trainingDays: tDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: value2,
    average: average,
  }
}

try {
  const { array1, value2 } = parseArgumentsArray(process.argv)
  const result = calculateExercises(array1, value2)
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
