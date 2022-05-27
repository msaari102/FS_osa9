import { NewPatientEntry, Gender, Entry, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHCRType = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseString = (element: unknown, type: string): string => {
  if (!element || !isString(element)) {
    throw new Error('Incorrect or missing ' + type);
  }
  return element;
};

const parseStrings = (element?: unknown[]): string[] => {
  const returnString : string[] = [];
  if (element){
    element.forEach(single => {if (!isString(single)) {
      throw new Error('Incorrect or missing entry field');
    } else returnString.push(single);
  });
  }
  return returnString;
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

const parseEntries = (entries: unknown[]): Entry[] => {
  const returnEntries: Entry[] = [];
  if (entries) {
    entries.forEach(element => {
      returnEntries.push(toEntry(element as EntryFields));
    });
  }
  return returnEntries;
};

const parseHCR = (type: unknown): HealthCheckRating => {
  if (!isHCRType(type)) {
    throw new Error('Incorrect or missing healthcheck rating');
  }
  return type;
};

type Fields = { name : unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, entries: unknown[] };
type EntryFields = { id : unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown[], type: unknown, healthCheckRating?: unknown, discharge?: unknown, sickLeave?: unknown, employerName?: unknown };

export const toEntry = ({ id, description, date, specialist, diagnosisCodes, type, healthCheckRating, discharge, sickLeave, employerName } : EntryFields): Entry => {
  let newEntry: Entry;
  switch (type) {
    case "Hospital":
      newEntry = {
        id: parseString(id, "id"),
        description: parseString(description, "description"),
        date: parseString(date, "date"),
        specialist: parseString(specialist, "specialist"),
        diagnosisCodes: parseStrings(diagnosisCodes),
        type: "Hospital",
        discharge: discharge as {date: string, criteria: string},
      };
      break;
    case "HealthCheck":  
      newEntry = {
        id: parseString(id, "id"),
        description: parseString(description, "description"),
        date: parseString(date, "date"),
        specialist: parseString(specialist, "specialist"),
        diagnosisCodes: parseStrings(diagnosisCodes),
        type: "HealthCheck",
        healthCheckRating: parseHCR(healthCheckRating),
      };
      break;
    case "OccupationalHealthcare":  
      newEntry = {
        id: parseString(id, "id"),
        description: parseString(description, "description"),
        date: parseString(date, "date"),
        specialist: parseString(specialist, "specialist"),
        diagnosisCodes: parseStrings(diagnosisCodes),
        type: "OccupationalHealthcare",
        sickLeave: sickLeave as {startDate: string, endDate: string},
        employerName : parseString(employerName, "employer name"),
      };
      break;
      default: throw new Error('Incorrect or missing entry type');
  }
  return newEntry;
};

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