import {
  findAllComments,
  findCommentById,
  findDeleteComment,
  createNewComment,
} from "../services/commentService.js";
import bcrypt from "bcrypt";

//* 카페별 모든 댓글 조회
export const getAllComments = async (req, res) => {
  try {
    const cafeId = req.params.cafeId;
    const comments = await findAllComments(cafeId);
    //: deleted가 0인 댓글이 없다면 빈배열([]) 반환
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//* 댓글 단건 조회
export const getComment = async (req, res) => {
  try {
    const comment = await findCommentById(req.params.id);
    if (!comment) res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//* 댓글 삭제
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
    }
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

//* 댓글 생성
export const createComment = async (req, res) => {
  try {
    //: 닉네임, 비밀번호, 댓글내용
    const { cafeId, nickname, password, content } = req.body;
    if (!cafeId || !nickname || !password || !content) {
      return res
        .status(400)
        .json({ success: false, message: "필수 입력값이 없습니다." });
    }
    //: password hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createNewComment(
      cafeId,
      nickname,
      hashedPassword,
      content
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
      res.status(500).json({ success: false, message: "서버 오류 발생" });
    }
  }
};
