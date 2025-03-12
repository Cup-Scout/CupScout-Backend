import {
  getAllCategories as getAllCategoriesModel,
  getCafesByCategoryId as getCafesByCategoryIdModel,
} from '../models/categoryModel.js';

export const getAllCategories = async () => {
  return await getAllCategoriesModel();
};

export const getCafesByCategoryId = async (categoryId) => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  return await getCafesByCategoryIdModel(categoryId);
};