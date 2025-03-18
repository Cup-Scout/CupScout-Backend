import express from 'express';
import {
  getAllCategories,
  getCafesByCategoryId,
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

// 카테고리
categoryRouter.get('/categories', getAllCategories);
categoryRouter.get('/categories/:id/cafes', getCafesByCategoryId);

export default categoryRouter;
