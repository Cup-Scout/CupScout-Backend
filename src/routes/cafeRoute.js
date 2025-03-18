import express from 'express';
import {
  getAllCafes,
  getCafes,
  getCafe,
  getCafesByName,
  getCafeHours,
  getCafesHours,
  getCafeHoursByDay,
} from '../controllers/cafeController.js';

const cafeRouter = express.Router();

// 카페
cafeRouter.get('/cafes', (req, res) => {
  if (req.query.ids) {
    getCafes(req, res);
  } else if (req.query.name) {
    getCafesByName(req, res);
  } else {
    getAllCafes(req, res);
  }
});
cafeRouter.get('/cafes/:id', getCafe);
cafeRouter.get('/cafes/:id/hours', getCafeHours);
cafeRouter.get('/cafes-hours', getCafesHours); // url 변경 가능성
cafeRouter.get('/cafes/:id/hours/:day', getCafeHoursByDay);

export default cafeRouter;
