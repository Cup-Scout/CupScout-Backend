import express from 'express';
import {
  getAllCafes,
  getCafes,
  getCafe,
  getCafeHours,
  getCafesHours,
  getCafeHoursByDay,
} from '../controllers/cafeController.js';

import {
  getAllCategories,
  getCafesByCategoryId,
} from '../controllers/categoryController.js';

const cafeRouter = express.Router();

// 카페
cafeRouter.get('/cafes', (req, res) => {
  req.query.ids ? getCafes(req, res) : getAllCafes(req, res);
});
cafeRouter.get('/cafes/:id', getCafe);
cafeRouter.get('/cafes/:id/hours', getCafeHours);
cafeRouter.get('/cafes-hours', getCafesHours); // url 변경 가능성
cafeRouter.get('/cafes/:id/hours/:day', getCafeHoursByDay);

// 카테고리
cafeRouter.get('/categories', getAllCategories);
cafeRouter.get('/categories/:id/cafes', getCafesByCategoryId);

export default cafeRouter;
