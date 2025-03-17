import pool from '../config/db.js';

//: DB에서 모든 댓글 조회
export const getComments = async () => {
  const [rows] = await pool.query('SELECT * FROM comment WHERE deleted = 0');
  return rows;
};

//: DB에서 특정 댓글 조회
export const getCommentById = async (id) => {
  //* deleted를 체크해서 삭제 여부 확인
  const [rows] = await pool.query(
    'SELECT * FROM comment WHERE id = ? AND deleted = 0',
    [id],
  );
  return rows[0] || null;
};

//: DB에서 댓글 삭제
export const deleteCommentById = async (id) => {
  const [result] = await pool.query(
    'UPDATE comment SET deleted = 1 WHERE id = ?',
    [id],
  );
  if (result.affectedRows === 0) {
    return { success: false, message: '댓글이 존재하지 않거나 이미 삭제됨.' };
  }
  return { success: true, message: '댓글이 삭제되었습니다.' };
};

export const createComment = async (cafeId, nickname, password, content) => {
  const [result] = await pool.query(
    'INSERT INTO comment (cafe_Id, nickname, password, content) VALUES (?, ?, ?, ?)',
    [cafeId, nickname, password, content],
  );
  if (result.affectedRows === 0) {
    return { success: false, message: '댓글 생성에 실패했습니다.' };
  }
  return { success: true, message: '댓글이 생성되었습니다.' };
};
