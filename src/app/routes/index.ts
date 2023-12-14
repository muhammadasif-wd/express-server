import express from 'express'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
//? for route call sdfsdfs
const router = express.Router()
const moduleRoutes = [
  { path: '/academic-semester', route: AcademicSemesterRoutes },
]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router
