const projectRoute = require('express').Router()
const ProjectController = require('../controllers/project')
const {authentication} = require('../middleware/authentication')
const {authorization} = require('../middleware/authorization')
const {po_authorization} = require('../middleware/po_authorization')


// AUTHENTICATED USERS MAY VIEW, ADD OR INVITE MEMBERS TO PROJECTS
projectRoute.use(authentication)
projectRoute.get('/', ProjectController.getAllProjects)
projectRoute.get('/:id', ProjectController.getOneProject)
projectRoute.post('/', ProjectController.addProject)
projectRoute.get('/:id/members', ProjectController.showMembers)
projectRoute.post('/:id/invite', ProjectController.invite)

// BUT ONLY PROJECT OWNERS MAY UPDATE, DELETE THE PROJECT OR FIRE MEMBERS
projectRoute.put('/:id', po_authorization, ProjectController.updateProject)
projectRoute.delete('/:id', po_authorization, ProjectController.dropProject)
projectRoute.delete('/:id/fire', po_authorization, ProjectController.fire)


// ONLY PROJECT MEMBERS MAY CRUD THE TASKS ASSOCIATED WITH THEIR PROJECTS, INCLUDING JOIN PROJECT ROOM
projectRoute.get('/:projectid/tasks', authorization, ProjectController.getAllTasks)
projectRoute.get('/:projectid/tasks/:taskid', authorization, ProjectController.getOneTask)
projectRoute.post('/:projectid/tasks', authorization, ProjectController.addTask)
projectRoute.put('/:projectid/tasks/:taskid', authorization, ProjectController.updateTask)
projectRoute.delete('/:projectid/tasks/:taskid', authorization, ProjectController.dropTask)

module.exports = projectRoute