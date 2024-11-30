import { Router } from 'express';
import TaskController from '../controllers/TaskController.js';

const router = Router();

router.post('/',  TaskController.createTask);
router.get('/', TaskController.getTasks);
router.get('/:taskId', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
