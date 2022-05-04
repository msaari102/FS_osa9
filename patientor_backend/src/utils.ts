import { NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing name');
  }

  return comment;
};

const parseSSN = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing SSN');
  }

  return comment;
};

const parseDoB = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return comment;
};

const parseGender = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing gender');
  }

  return comment;
};

const parseOccupation = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing occupation');
  }

  return comment;
};

type Fields = { name : unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation } : Fields): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDoB(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newEntry;
};

export default toNewPatientEntry;