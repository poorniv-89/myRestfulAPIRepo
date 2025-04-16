//Imports
import express from 'express';
import userRoutes from './routes/userRoutes.mjs'
import postRoutes from './routes/postsRoutes.mjs';
import logginReq from './middleware/logginReq.mjs';
import apiCheck from './middleware/apiCheck.mjs';
import error from './utilities/error.mjs';

// Setups
const app = express();
const PORT = 3000 || 3001;

// Middleware
app.use(express.json()); //body parsing middleware

// New middleware to check for API keys!
// Note that if the key is not verified,
// we do not call next(); this is the end.
// This is why we attached the /api/ prefix
// to our routing at the beginning!
app.use('/api', apiCheck);

// New logging middleware to help us keep track of
// requests during testing!
app.use(logginReq);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Adding some HATEOAS links.
app.get('/', (req, res) => {
  res.json({
    links: [
      {
        href: '/api',
        rel: 'api',
        type: 'GET',
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get('/api', (req, res) => {
  res.json({
    links: [
      {
        href: 'api/users',
        rel: 'users',
        type: 'GET',
      },
      {
        href: 'api/users',
        rel: 'users',
        type: 'POST',
      },
      {
        href: 'api/posts',
        rel: 'posts',
        type: 'GET',
      },
      {
        href: 'api/posts',
        rel: 'posts',
        type: 'POST',
      },
    ],
  });
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, 'Resource Not Found'));
});

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server Connected on Port: ${PORT}`);
});
