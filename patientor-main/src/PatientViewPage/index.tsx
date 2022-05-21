import React from "react";
import axios from "axios";
import { Box, Table, TableHead, Typography } from "@material-ui/core";
import { useStateValue } from "../state";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientViewPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const idx = id || "";

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${idx}`
      );
      dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
    } catch (e) {
      console.error(e);
    }
  };

  if (!patients[idx]) return null;

  if (!patients[idx].ssn) {
    void fetchPatient();
  }

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
        {Object.values(patients).filter(patient => patient.id === idx).map((patient: Patient) => (
        <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>{patient.ssn}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientViewPage;
