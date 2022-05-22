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

  console.log(diagnoses);

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
      <ul>{Object.values(patient.entries ||[]).map((entry: Entry) => (
        <li key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          {Object.values(entry.diagnosisCodes||[]).map((code: string) => (<div key={code}>{code} {diagnoses.find(element => element.code === code)?.name}</div>))}
        </li>
      ))}</ul>
    </div>
  );
};

export default PatientViewPage;


/*
            {Object.values(patient.entries).map((entry: Entry) => (
                      <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.description }</TableCell>
                      <TableCell>{entry.diagnosisCodes}</TableCell>
                    </TableRow>
            ))}
            */