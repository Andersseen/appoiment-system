import { Router } from 'express';
import {
  createClientController,
  deleteClientController,
  getAllClientsController,
  getClientByIdController,
  updateClientController,
} from '../controllers/clientController';

const route = Router();

route.get('/', getAllClientsController);
route.post('/', createClientController);
route.get('/:id', getClientByIdController);
route.put('/:id', updateClientController);
route.delete('/:id', deleteClientController);

export { route as clientRoute };
