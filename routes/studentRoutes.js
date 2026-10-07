import * as studentController from '../controllers/studentController.js';
import express from "express"

const studentRoutes = express.Router();

studentRoutes.get('/all', studentController.fetchAllStudent);

export default studentRoutes;