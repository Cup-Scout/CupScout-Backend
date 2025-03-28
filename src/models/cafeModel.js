import pool from '../config/db.js';

export const getAllCafes = async () => {
  const [rows] = await pool.query('SELECT * FROM cafe');
  return rows;
};

export const getCafeById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM cafe WHERE id = ?', [id]);
  return rows[0];
};

export const getCafesByIds = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Invalid or empty ID list provided");
  }

  const placeholders = ids.map(() => '?').join(',');
  const query = `SELECT * FROM cafe WHERE id IN (${placeholders})`;

  const [rows] = await pool.query(query, ids);
  return rows;
};

export const findCafesByName = async (name) => {
  // DB에서 공백 제거 + 대소문자 무시 검색
  const [rows] = await pool.query(`SELECT * FROM cafe WHERE LOWER(REPLACE(name, ' ', '')) LIKE LOWER(?)`, [`%${name}%`]);
  return rows;
};
export const getCafeOperatingHoursById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM cafe_operating_info WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

export const getCafeOperatingHoursByIds = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Invalid or empty ID list provided");
  }

  const placeholders = ids.map(() => "?").join(",");
  const query = `SELECT * FROM cafe_operating_info WHERE id IN (${placeholders})`;
  
  const [rows] = await pool.query(query, ids);
  return rows;
};

export const getCafeOperatingHoursByDay = async (id, openColumn, closeColumn) => {
  const query = `
    SELECT open_24h, ${openColumn} AS open, ${closeColumn} AS close
    FROM cafe_operating_info 
    WHERE id = ?;
  `;

  const [rows] = await pool.query(query, [id]);
  return rows.length ? rows[0] : null;
};