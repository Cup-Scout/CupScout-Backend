import db from '../config/db.js';

export const getAllCategories  = async () => {
  const query = `SELECT * FROM category`;
  const [rows] = await db.query(query);
  return rows;
};

export const getCafesByCategoryId = async (categoryId) => {
  const query = `
    SELECT c.*
    FROM cafe c
    JOIN cafe_category_info ci ON c.id = ci.cafe_id
    WHERE ci.category_id = ?;
  `;

  const [rows] = await db.query(query, [categoryId]);
  return rows;
};