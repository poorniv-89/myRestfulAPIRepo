import express from 'express';
import { users } from '../data/users.mjs';
import { posts } from '../data/posts.mjs';
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('post routes');
})

router.get('/:id', (req, res, next) => {
    const post = posts.find((u) => u.id == req.params.id);
    if (post) res.json(post);
    else next();
  });


export default router;