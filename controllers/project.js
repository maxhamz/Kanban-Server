const {
    Project,
    ProjectUser,
    Task,
    User
} = require('../models')
const {
    customError
} = require('../helpers/customError')

let user_id
let task_id
let project_id

class TaskController {

    // PROJECT'S
    static getAllProjects(req, res, next) {
        user_id = req.decoded.id
        return ProjectUser.findAll({
            where: {
                UserId: user_id
            },
            order: [
                        ['updatedAt', 'DESC']
                    ],
            include: [
                {
                    model: Project,
                    include: {
                        model: User,
                        attributes: {
                            exclude: [
                                'password', 'createdAt', 'updatedAt'
                            ]
                        }
                    },
                    attributes: {
                        exclude: [
                            'createdAt', 'updatedAt'
                        ]
                    }

                },
                {
                    model: User,
                    attributes: {
                        exclude: [
                            'password', 'createdAt', 'updatedAt'
                        ]
                    }
                }
            ]
        })
        .then(response => {

            if (response) {
                return res.status(200).json(response)
            } else {
                throw customError(404, 'NOT FOUND')
            }

        })
        .catch(err => {
            next(err)
        })
    }


    static getOneProject(req, res, next) {
        console.log("FETCH ONE PROJECT");
        project_id = +req.params.id
        return Project.findOne({
            where: {
                id: project_id
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: [
                            'password', 'createdAt', 'updatedAt'
                        ]
                    }
                }
            ]
        })
        .then(response => {
            if (response) {
                res.status(200).json(response)
            } else {
                throw new customError(404, 'NOT FOUND')
            }

        })
        .catch(err => {
            next(err)
        })
    }


    static addProject(req, res, next) {
        console.log("ADDING NEW PROJECT");
        console.log(req.body);
        return Project.create({
            UserId: req.decoded.id,
            title: req.body.title
        })
        .then(response => {
            console.log("PROJECT CREATED");
            console.log(response);
            user_id = response.UserId
            project_id = response.id

            
            return ProjectUser.create({
                UserId: user_id,
                ProjectId: project_id,
                include: [User, Project]
            })
        })
        .then(response => {
            console.log("PROJECT USER CREATED");
            console.log(response);
            return res.status(201).json(response)
        })
        .catch(err => {
            console.log("ERROR CREATING PROJECT");
            next(err)
        })

    }


    static invite(req, res, next) {
        console.log("INVITE MEMBER FROM CONTROLLER");
        console.log(req.body);

        project_id = +req.params.id

         // CHECK IF USER EXIST IN DATABASE
         User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(response => {

            // 
            if (response) {
                console.log("USER FOUND");
                user_id = response.id

                // CHECK IF PROJECT HAS THAT MEMBER ALREADY
                return ProjectUser.findOne({
                    where: {
                        UserId: user_id,
                        ProjectId: project_id
                    }
                })

            } else {
                throw new customError(404, 'NOT FOUND')
            }
        })
        .then(response => {
            console.log("WHAT'S VERDICT2");
            console.log(response);
            if (response) {
                throw new customError(400, 'DUPLICATE ASSIGNMENT')
            } else {
                return ProjectUser.create({
                    UserId: user_id,
                    ProjectId: project_id
                })
            }

        })
        .then(response => {
            console.log("INVITATION SENT");
            return res.status(201).json(response)
        })
        .catch(err => {
            next(err)
        })



    }


    static updateProject(req, res, next) {
        console.log("UPDATING PROJECT");
        project_id = +req.params.id
        return Project.findOne({
                where: {
                    id: project_id
                }
            })
            .then(response => {
                if (response) {
                    console.log("PROJECT FOUND. WHAT ABOUT OWNER-WANNABE?");
                    return User.findOne({
                        where: {
                            email: req.body.email
                        }
                    })
                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .then(response => {
                console.log("USER FOUND?");
                if (response) {
                    console.log("USER FOUND! LET'S UPDATED");
                    return Project.update({
                        title: req.body.title,
                        UserId: response.id
                    }, {
                        where: {
                            id: +req.params.id
                        },
                        returning: true
                    })
                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .then(response => {
                console.log("PROJECT UPDATED");
                return res.status(200).json(response[1][0])
            })
            .catch(err => {
                return next(err)
            })

    }


    static dropProject(req, res, next) {
        console.log("DELETING PROJECT");
        project_id = +req.params.id
        return Project.findOne({
                where: {
                    id: project_id
                }
            })
            .then(response => {
                if (response) {
                    console.log("PROJECT FOUND, NOW DELETING");
                    return Project.destroy({
                        where: {
                            id: response.id
                        }
                    })
                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .then(_ => {
                console.log("PROJECT DELETED");
                return res.status(200).json({
                    message: "PROJECT DELETED"
                })
            })
            .catch(err => {
                return next(err)
            })
    }




    // TASKS'
    static getAllTasks(req, res, next) {
        console.log("FETCH ALL TASKS OF A PROJECT");
        project_id = +req.params.projectid
        return Task.findAll({
                where: {
                    ProjectId: project_id
                },
                include: [Project],
                order: [
                    ['createdAt', 'ASC']
                ]
            })
            .then(response => {
                console.log("FETCHED ALL TASKS");
                return res.status(200).json(response)
            })
            .catch(err => {
                next(err)
            })

    }


    static getOneTask(req, res, next) {
        project_id = +req.params.projectid
        task_id = +req.params.taskid
        console.log("GET A PROJECT'S TASK");
        return Task.findOne({
                where: {
                    id: task_id,
                    ProjectId: project_id
                }
            })
            .then(response => {
                if (response) {
                    console.log("TASK FOUND");
                    return res.status(200).json(response)

                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .catch(err => {
                next(err)
            })

    }


    static addTask(req, res, next) {

        project_id = +req.params.projectid
        console.log("ADD TASK 2 PROJECT");
        return Project.findOne({
                where: {
                    id: project_id
                }
            })
            .then(response => {
                if (response) {
                    console.log("PROJECT FOUND, NOW ADDING");
                    return Task.create({
                        title: req.body.title,
                        category: "pending",
                        ProjectId: response.id
                    })

                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .then(response => {
                console.log("NEW TASK ADDED");
                return res.status(201).json(response)
            })
            .catch(err => {
                next(err)
            })

    }


    static updateTask(req, res, next) {

        console.log("UPDATING A PROJECT'S TASK");
        // console.log(req.params);
        project_id = +req.params.projectid
        task_id = +req.params.taskid
        // console.log(project_id, task_id);
        return Project.findOne({
                where: {
                    id: project_id
                }
            })
            .then(response => {
                if (response) {
                    console.log("PROJECT FOUND, NOW UPDATING");
                    // console.log(response);
                    return Task.update({
                        title: req.body.title,
                        category: req.body.category
                    }, {
                        where: {
                            id: task_id,
                            ProjectId: response.id
                        },
                        returning: true
                    })

                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .then(response => {
                console.log("TASK UPDATED");
                res.status(200).json(response[1][0])
            })
            .catch(err => {
                next(err)
            })

    }


    static dropTask(req, res, next) {

        console.log("DROPPING A TASK FROM A PROJECT");
        project_id = +req.params.projectid
        task_id = +req.params.taskid
        return Project.findOne({
                where: {
                    id: project_id
                }
            })
            .then(response => {
                if (response) {
                    console.log("PROJECT FOUND, WHAT ABOUT ASK IN HAND?");
                    // console.log(response);
                    return Task.findOne({
                        where: {
                            id: task_id
                        }
                    })

                } else {
                    throw new customError(404, 'NOT FOUND')
                }
            })
            .then(response => {
                if(response) {
                    // console.log(response);
                    console.log("TASK FOUND, NOW DELETING");
                    return Task.destroy({
                        where: {
                            id: response.id,
                            ProjectId: project_id
                        },
                        returning: true
                    })

                } else {
                    throw customError(404, 'NOT FOUND')
                }
            })
            .then(_ => {
                console.log("TASK DROPPED");
                res.status(200).json({
                    message: 'TASK DROPPED FROM PROJECT'
                })
            })
            .catch(err => {
                next(err)
            })

    }


}

module.exports = TaskController