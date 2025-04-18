import express from "express";
import {
  getAllComments,
  getComment,
  deleteComment,
  createComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

//* 카페별 모든 댓글 조회
commentRouter.get("/comments/:cafeId", getAllComments);
//* 댓글 단건 조회
commentRouter.get("/comments/:id", getComment);
//* 댓글 삭제
commentRouter.patch("/comments/:id", deleteComment);
//* 댓글 생성
commentRouter.post("/comments", createComment);

export default commentRouter;
