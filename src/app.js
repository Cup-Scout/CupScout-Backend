import express from 'express';
import dotenv from 'dotenv';
import cafeRouter from './routes/cafeRoutes.js';
import commentRouter from './routes/commentRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

//: 라우터 연결
app.use('/api', cafeRouter);
app.use('/api', commentRouter);

//: 서버 실행
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
