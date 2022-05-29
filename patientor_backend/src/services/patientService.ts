import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry, Entry } from '../types';
import {v4 as uuidv4} from 'uuid';
import toNewPatientEntry from '../utils';

const patients: Patient[] = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PublicPatient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry) => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: Entry) => {
  const patient = patients.find(d => d.id === patientId) as Patient;
  patient.entries.push(entry);

  patients.push(patient);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};