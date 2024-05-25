const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const authRoutes = require('./server/routes/auth');

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin:[],
//   methods:["POST"],
//   credentials:true
// }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
