import { Router } from 'express';
import {
  createColorController,
  deleteColorController,
  getAllColorsController,
  updateColorController,
} from '../controllers/colorController';
import { getClientByIdController } from '../controllers/clientController';

const route = Router();

route.get('/', getAllColorsController);
route.post('/', createColorController);
route.get('/:id', getClientByIdController);
route.put('/:id', updateColorController);
route.delete('/:id', deleteColorController);

export { route as colorRoute };
