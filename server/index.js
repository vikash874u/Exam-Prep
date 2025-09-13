const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use(express.json());

//Mongodb connection
const URL = 'mongodb+srv://yourUsername:yourPassword@atlas-sql-68c3c8ea3ec6db02f7f7c42b-lsq6t1.a.query.mongodb.net/examprep?retryWrites=true&w=majority&ssl=true&authSource=admin
'
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

app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000/")
})
