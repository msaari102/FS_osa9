import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
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

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing occupation');
  }
  return comment;
};

const parseEntries = (entries: string[]): string[] => {
  if (!entries) {
    throw new Error('Incorrect or missing entry');
  } else {
    entries.forEach(element => {
      if (!isString(element)) {
        throw new Error('Incorrect or missing entry');
      }
    });
  }
  return entries;
};

type Fields = { name : unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, entries: string[] };

const toNewPatientEntry = ({ name, ssn, dateOfBirth, gender, occupation, entries } : Fields): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDoB(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newEntry;
};

export default toNewPatientEntry;