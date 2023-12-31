const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const authRoute = require('./routes/auth.routes');

app.use(express.json());
app.use(cors());
// app.use(
//     cors({
//       credentials: true,
//       origin: ["http://localhost:"],
//     })
//   );
app.use('/api', authRoute);

app.listen(PORT, (err) => {
    if(err) process.exit(1);
    console.log(`Server running on port ${PORT}`);
});