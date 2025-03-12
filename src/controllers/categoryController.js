import {
    getAllCategories as getAllCategoriesService,
    getCafesByCategoryId as getCafesByCategoryIdService
} from '../services/categoryService.js';
  
  // 모든 카테고리 조회
  export const getAllCategories = async (req, res) => {
    try {
      const categories = await getAllCategoriesService();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // 특정 카테고리에 포함되는 카페 목록 조회
  export const getCafesByCategoryId = async (req, res) => {
    try {
      const cafes = await getCafesByCategoryIdService(req.params.id);
      res.json(cafes);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };