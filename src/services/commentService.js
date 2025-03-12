import {
  getComments,
  getCommentById,
  deleteCommentById,
  createComment,
} from '../models/commentModel.js';
import bcrypt from 'bcrypt';

import { getCafeById } from '../models/cafeModel.js';

export const findAllComments = async () => {
  //: DB에서 데이터 조회하는 함수 호출 후 리턴
  return await getComments();
};

export const findCommentById = async (id) => {
  //: DB에서 데이터 조회하는 함수 호출 후 리턴
  const comment = await getCommentById(id);
  if (!comment) throw new Error('댓글을 찾을 수 없습니다.');
  return comment;
};

export const findDeleteComment = async (id, password) => {
  //: 이름은 delete이지만 실제로는 update 동작
  const comment = await getCommentById(id);
  if (!comment || comment.deleted === 1) {
    throw { status: 404, message: '잘못된 요청입니다.' };
  }
  const storedHash = comment.password;
  const isMatch = await bcrypt.compare(password, storedHash);
  if (!isMatch) throw { status: 404, message: '비밀번호가 일치하지 않습니다.' };
  const result = await deleteCommentById(id);
  return result;
};

export const createNewComment = async (cafeId, nickname, password, content) => {
  const cafe = await getCafeById(cafeId);
  if (!cafe) throw { status: 404, message: '등록되지 않은 카페입니다.' };
  const result = await createComment(cafeId, nickname, password, content);
  return result;
};
