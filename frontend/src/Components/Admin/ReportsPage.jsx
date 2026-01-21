import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useAdmin } from "../../Context/AdminContext";

const ReportsPage = () => {
  const { token } = useAdmin();
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    }
  };

  const resolveReport = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reports/${id}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReports((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "resolved" } : r
        )
      );
    } catch (err) {
      console.error("Failed to resolve report", err);
    }
  };

  useEffect(() => {
    if (token) fetchReports();
  }, [token]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Overdue Reports
      </Typography>

      {reports.length === 0 ? (
        <Typography color="text.secondary">
          No overdue reports found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {reports.map((report) => (
            <Grid item xs={12} md={6} key={report._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    {report.booking?.service?.name || "Unknown Service"}
                  </Typography>
                  <Typography>
                    User: {report.reporter?.name}
                  </Typography>
                  <Typography>
                    Provider: {report.provider?.name || "Unassigned"}
                  </Typography>
                  <Typography>
                    Status: {report.status}
                  </Typography>
                  <Typography>
                    Reason: {report.reason}
                  </Typography>

                  {report.status === "pending" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => resolveReport(report._id)}
                    >
                      Resolve
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ReportsPage;
