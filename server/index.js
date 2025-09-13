const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

//Mongodb connection
const URL = process.env.MONGUrl || 'mongodb://localhost:27017/examprep'
mongoose.connect(URL)
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

  //api started
app.use("/api/admin",require('./routes/adminRoute'))
// this api use for crud operation
app.use("/api/session/",require('./routes/sessionRoute'));
app.use("/api/subject/",require('./routes/subjectRoute'));
app.use("/api/exams/",require('./routes/examinationRoute'));
app.use("/api/question", require('./routes/questionBankRoute'))
app.use("/api/examinee/",require('./routes/examineeRoute'))
app.use("/api/message/",require('./routes/MessageRoute'))
// api end

app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:5000/")
})
