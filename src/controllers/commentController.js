import {
  findAllComments,
  findCommentById,
  findDeleteComment,
  createNewComment,
} from '../services/commentService.js';
import bcrypt from 'bcrypt';

// DB에서 조회된 데이터 가져와서 가공
export const getAllComments = async (req, res) => {
  try {
    const comments = await findAllComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await findCommentById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const inputPassword = req.body.password;
    const result = await findDeleteComment(req.params.id, inputPassword);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: '서버 오류 발생' });
    }
  }
};

export const createComment = async (req, res) => {
  try {
    //: 닉네임, 비밀번호, 댓글내용
    const { cafeId, nickname, password, content } = req.body;
    if (!cafeId || !nickname || !password || !content) {
      return res
        .status(400)
        .json({ success: false, message: '필수 입력값이 없습니다.' });
    }
    //: password hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createNewComment(
      cafeId,
      nickname,
      hashedPassword,
      content,
    );
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: '서버 오류 발생' });
    }
  }
};
