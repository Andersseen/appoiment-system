import { Router } from 'express';
import MarkController from '../controllers/markController';

const route = Router();
const markController = new MarkController();

route.get('/', markController.getAllMarks);
route.post('/', markController.createMark);
route.get('/:key', markController.getMarkByKey);
route.delete('/:key', markController.deleteMark);

export { route as markRoute };
