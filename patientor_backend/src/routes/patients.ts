import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;