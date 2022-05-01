import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addiagnose = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addiagnose
};