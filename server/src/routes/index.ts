import { type Application, type Router } from 'express'

import studentRoute from './student.route'
import teacherRoute from './teacher.route'
import materiRoute from './materi.route'
import subMateriRoute from './sub-materi.route'
import scoreRouter from './score.route'
// import questionRoute from './question.route'
// import gameRoute from './game.route'

const _routes = [
  ['/student', studentRoute],
  ['/teacher', teacherRoute],
  ['/materi', materiRoute],
  ['/sub-materi', subMateriRoute],
  ['/score', scoreRouter]
  // ['/game', gameRoute],
  // ['/question', questionRoute]
]

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url as string, router as Router)
  })
}

export default routes
