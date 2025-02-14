const dbConfig = {
  user: "chin9934553202",
  password: "9934553202",
  server: "192.168.0.174",  // Add port if needed: "192.168.0.174,1433"
  database: "Details",
  options: {
      encrypt: false,  // Set to true if using Azure
      trustServerCertificate: true, // Required for self-signed certificates
      enableArithAbort: true // Helps avoid some connection issues
  },
 port:1433,
};

module.exports = dbConfig;
