const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const familyRoutes = require("./routes/family");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/family", familyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
