import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const addiagnose = () => {
  return null;
};

export default {
  getEntries,
  addiagnose
};