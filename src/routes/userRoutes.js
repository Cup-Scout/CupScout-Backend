import express from 'express';
import {
  getAllCafes,
  getCafes, 
  getCafe,
  getCafeHours,
  getCafesHours,
  getCafeHoursByDay
} from '../controllers/cafeController.js';

import {
  getAllCategories,
  getCafesByCategoryId
} from '../controllers/categoryController.js';

const router = express.Router();

// 카페
router.get('/cafes', (req, res) => {
  req.query.ids ? getCafes(req, res) : getAllCafes(req, res);
});
router.get('/cafes/:id', getCafe);
router.get('/cafes/:id/hours', getCafeHours);
router.get('/cafes-hours', getCafesHours); // url 변경 가능성
router.get('/cafes/:id/hours/:day', getCafeHoursByDay);

// 카테고리
router.get('/categories', getAllCategories);
router.get('/categories/:id/cafes', getCafesByCategoryId);

export default router;
