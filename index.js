const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
console.log('__dirname:', __dirname); 
const questionRoutes = require('./routes/questionRoutes');
console.log(questionRoutes)
const responseRoutes = require('./routes/responseRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const adminRoutes = require('./routes/adminRoutes');



const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

