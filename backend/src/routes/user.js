import { Router } from 'express';
import { users } from '../data/users.js';

const router = Router();

// gets all users
router.get('/', (req, res) => {
    res.json(users);
});

// get user by id
router.get('/:id', (req,res) => {
    const uId = Number(req.params.id)
    const user = users.find(u => u.id === uId);
    
    if (user) return res.json(user);
    res.status(400).json(user);
    res.status(404).json({ errro: 'User not found' });
});

export default router;