import express from 'express';
import dotenv from 'dotenv';
import cafeRouter from './routes/cafeRoute.js';
import commentRouter from './routes/commentRoute.js';
import categoryRouter from './routes/categoryRoute.js';

dotenv.config();
const app = express();
app.use(express.json());

//: 라우터 연결
app.use('/api', cafeRouter);
app.use('/api', commentRouter);
app.use('/api', categoryRouter);

//: 서버 실행
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
