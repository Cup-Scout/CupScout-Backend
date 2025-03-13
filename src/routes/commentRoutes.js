import express from 'express';
import {
  getAllComments,
  getComment,
  deleteComment,
  createComment,
} from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.get('/comments', getAllComments);
commentRouter.get('/comments/:id', getComment);
commentRouter.patch('/comments/:id', deleteComment);
commentRouter.post('/comments', createComment);

export default commentRouter;
