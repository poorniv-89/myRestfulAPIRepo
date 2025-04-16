import express from 'express';

import { users } from '../data/users.mjs';
import { posts } from '../data/posts.mjs';

const router = express.Router();


// router.get('/', (req, res)=>{
//     res.json(users);
// })

router
.route('/')
.get((req, res)=>{
    res.json(users);
})
.post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "Username Already Taken" });
        return;
      }
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  })
  router
  .route('/:id')
  .patch((req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
      const user = users[userIndex];
      for (const key in req.body) {
        if (user.hasOwnProperty(key)) {
          user[key] = req.body[key];
        }
      }
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  })
  .delete((req, res, next)=>{
  })

router.get('/:id', (req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next();
  });

export default router;