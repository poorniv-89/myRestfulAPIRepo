//imports
import express from 'express';
import postRouter from './routes/postsRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';

//setups
const app = express();
const PORT = 3000 || 3001;
app.use(express.json());

//middleware

//routes

app.use('/users', userRouter);
app.use('/posts', postRouter)

app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});
  

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
})