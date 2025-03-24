import express from 'express';
import dotenv from 'dotenv';
import cafeRouter from './routes/cafeRoute.js';
import commentRouter from './routes/commentRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', // 허용할 도메인
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

//: 라우터 연결
app.use('/api', cafeRouter);
app.use('/api', commentRouter);
app.use('/api', categoryRouter);

//: 서버 실행
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
