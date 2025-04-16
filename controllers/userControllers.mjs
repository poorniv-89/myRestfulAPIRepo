import users from '../data/users.mjs';
import error from '../utilities/error.mjs';

function createUser(req, res, next) {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username === req.body.username)) {
      return next(error(409, 'Username Already Taken'));
    }

    const user = {
      id: users.length ? users[users.length - 1].id + 1 : 1,  // Start from 1 if empty
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(user);
    res.json(users[users.length - 1]);
  } else {
    return next(error(400, 'Insufficient Data'));
  }
}

function getAllUsers(req, res) {
    console.log("All users:", users);
  const links = [
    {
      href: 'users/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  res.json({ users, links });
}

function getOneUser(req, res, next) {
  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  const user = users.find((u) => u.id == req.params.id);

  if (user) res.json({ user, links });
  else return next(error(404, 'User Not Found'));
}

function editUser(req, res, next) {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (user) res.json(user);
  else return next(error(404, 'User Not Found'));
}

function deleteUser(req, res, next) {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
  else return next(error(404, 'User Not Found'));
}

export default { createUser, getAllUsers, getOneUser, editUser, deleteUser };