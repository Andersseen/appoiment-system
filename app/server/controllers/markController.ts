import { errorResponse } from '../utils/error.handler';
import { redis } from '../utils/redis';

class MarkController {
  async getAllMarks(req, res) {
    try {
      const response = await redis.keys('*');
      if (!response) {
        return errorResponse(res, 'Not found', 404, false);
      }
      res.status(200).json(response);
    } catch (error) {
      errorResponse(res, error.message, 404, false);
    }
  }

  async getMarkByKey(req, res) {
    try {
      const response = await redis.get(req.params.key);
      if (!response) {
        return errorResponse(res, 'Not found', 404, false);
      }
      res.status(200).json(response);
    } catch (error) {
      errorResponse(res, error.message, 404, false);
    }
  }

  async createMark(req, res) {
    try {
      const response = await redis.set(req.body.key, req.body.value);
      if (!response) {
        return errorResponse(res, 'Not found', 404, false);
      }
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async deleteMark(req, res) {
    try {
      const { key } = req.params;
      const result = await redis.del(key);

      // Verifica si se eliminó correctamente y envía la respuesta correspondiente
      if (result === 1) {
        res.status(200).json({
          success: true,
          message: 'Elemento eliminado correctamente.',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'La clave especificada no existe.',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el elemento.',
        error: error.message,
      });
    }
  }
}

export default MarkController;
