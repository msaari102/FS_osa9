import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import toNewPatientEntry, { toEntry} from '../utils';
import {v4 as uuidv4} from 'uuid';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});


router.get('/:id', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = req.body;
    newEntry.id = uuidv4();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toEntry(newEntry);

    const addedEntry = patientService.addEntry(req.params.id, newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    const er = e as Error;
    res.status(400).send(er.message);
  }
});


router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    const er = e as Error;
    res.status(400).send(er.message);
  }
});

export default router;

