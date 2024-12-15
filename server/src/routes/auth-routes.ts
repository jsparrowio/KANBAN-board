import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {

const { username, password } = req.body;

const user = await User.findOne({
  where: { username },
});
if(!user) {
  return res.status(401).json({ message: 'User not found. Did the user mean to sign up?' });
}

const validatePassword = await bcrypt.compare(password, user.password);
if (!validatePassword) {
  return res.status(401).json({ message: 'Username or Password incorrect' });
}

const secretKey = process.env.JWT_SECRET_KEY || '';

const token = jwt.sign({ username }, secretKey, { expiresIn: '1hr' });
return res.json({ token })
};

const router = Router();

router.post('/login', login);

export default router;
