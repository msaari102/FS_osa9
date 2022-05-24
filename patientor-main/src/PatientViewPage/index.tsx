import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, TableHead, Typography } from "@material-ui/core";
import { useStateValue, updatePatient } from "../state";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

const entryStyle = {  
  border: "2px solid",  
  padding: "10px", 
  margin: "10px",  
}; 

const PatientViewPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();
  const idx = id || "";

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${idx}`
      );
      //dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
      dispatch(updatePatient(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    axios
    .get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then(response => {
        setDiagnoses(response.data);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  if (!patients[idx]) return null;

  if (!patients[idx].ssn) {
    void fetchPatient();
  }

  const patient = patients[idx];

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
      
    </div>
  );
};

export default PatientViewPage;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
