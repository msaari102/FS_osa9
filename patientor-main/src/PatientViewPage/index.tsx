import axios from "axios";
import React from "react";
import { Box, Button, Table, TableHead, Typography } from "@material-ui/core";
import { useStateValue, updatePatient } from "../state";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import AddHealthCheckEntryModal, { AddHospitalEntryModal, AddOccupationalHealthcareEntryModal} from "../AddEntry/index";
import { EntryFormValues } from "../AddEntry/AddHealthCheckEntryForm";

const entryStyle = {  
  border: "2px solid",  
  padding: "10px", 
  margin: "10px",  
}; 

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>Hospital</p>
          <p>Discharge date: {entry.discharge.date}</p>
          <p>Discharge criteria: {entry.discharge.criteria}</p>
        </div>
        );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>Occupational healthcare</p>
          <p>Employer: {entry.employerName}</p>
          <p>Sickleave start date: {entry.sickLeave?.startDate}</p>
          <p>Sickleave end date: {entry.sickLeave?.endDate}</p>
        </div>
        );
    case "HealthCheck":
      return (
        <div>
          <p>Health check</p>
          <HealthRatingBar showText={true} rating={entry.healthCheckRating} />
        </div>
        );
    default:
      return assertNever(entry);
  }
};

const PatientViewPage = () => {
  const [{ patientInfo, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = React.useState<boolean>(false);
  const [modalOpen3, setModalOpen3] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { id } = useParams<{ id: string }>();
  const idx = id || "";

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${idx}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patientInfo[idx]) {
      void fetchPatient();
    }
  }, []);

  if (!patientInfo[idx]) return null;

  const patient = patientInfo[idx];

  const openModal = (): void => setModalOpen(true);
  const openModal2 = (): void => setModalOpen2(true);
  const openModal3 = (): void => setModalOpen3(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setModalOpen2(false);
    setModalOpen3(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${idx}/entries`,
        values
      );
      //dispatch({ type: "ADD_PATIENT", payload: newPatient });
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patien information
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>SSN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.occupation}</TableCell>
            <TableCell>{patient.ssn}</TableCell>
            <TableCell>{}</TableCell>
        </TableRow>
        </TableBody>
      </Table>
      {Object.values(patient.entries ||[]).map((entry: Entry) => (
        <Box key={entry.id} style={entryStyle}>
          <p>{entry.date}</p> 
          <i>{entry.description}</i>
          <ul>
            {Object.values(entry.diagnosisCodes||[]).map((code: string) => (<li key={code}>{code} {diagnoses.find(element => element.code === code)?.name}</li>))}
          </ul>
          <EntryDetails entry={entry} />
          <p>diagnosed by {entry.specialist} </p>
        </Box>
      ))}
      <div>
      <AddHealthCheckEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddHospitalEntryModal
        modalOpen={modalOpen2}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <AddOccupationalHealthcareEntryModal
        modalOpen={modalOpen3}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Healthcheck Entry
      </Button>
      <Button variant="contained" onClick={() => openModal2()}>
        Add New Hospital Entry
      </Button>
      <Button variant="contained" onClick={() => openModal3()}>
        Add New Occupational Healthcare Entry
      </Button>
      </div>
    </div>
  );
};

export default PatientViewPage;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
