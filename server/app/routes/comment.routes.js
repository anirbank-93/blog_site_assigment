import { verifyToken } from '../middleware/index.js';
import { newComment, getAllPostComments, deleteComment } from '../controllers/comment.controller.js';

export default function (app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Access',
        );
        next()
    });

    app.post('/api/comments', [verifyToken], newComment);
    app.get('/api/comments/:postId', [verifyToken], getAllPostComments);
    app.delete('/api/comments/:commentId', [verifyToken], deleteComment);
}