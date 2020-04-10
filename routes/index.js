const router = require('express').Router()
const userRoute = require("./user")
const projectRoute = require('./project')

router.get('/', (req, res, next) => {
    res.json({message: 'test'})
})

router.use("/users", userRoute)
router.use('/projects', projectRoute)

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        socket.on('test', (msg) => {
            console.log(`${msg.message}: THIS IS FROM CLIENT`);
        })


        //REGISTER
        socket.on('registered', (payload) => {
            console.log("SERVER SEZ: WELCOME, NEW USER!");
            console.log(payload.data);
        })

        //LOGIN
        socket.on('loggedin', (payload) => {
            console.log("SERVER SEZ: WELCOME BACK, USER!");
            console.log(payload.data);
            io.emit('loggedin2', payload.data.email)
            
        })


        //LOGOUT
        socket.on('loggedout', (payload) => {
            console.log("SERVER SEZ:");
            console.log(payload);
            io.emit('loggedout2', payload)
        })


        //FETCHING NEW PROJECT
        socket.on('getProjects', (payload) => {
            console.log("SHOWING ALL PROJECTS");
            io.emit('getProjects2', payload)
        }) 

        

        //ADDED NEW PROJECT
        socket.on('new_project', (payload) => {
            console.log("HI HO, NEW PROJECT");
            console.log(payload);
            io.emit('added_project', payload)
        })

        //INVITED NEW MEMBER
        socket.on('new_member', (payload) => {
            console.log(">>>> HI HO, NEW MEMBER!");
            console.log(payload);
            io.emit('new_member2', payload)
        })



        //DELETED A PROJECT
        socket.on('project_deleted', (msg) => {
            console.log("DELETE PROJECT SUCCESS");
            console.log(msg);
            io.emit('droppedProject', 'A PROJECT HAS BEEN DROPPED')
        })


        //FETCH TASKS
        socket.on('getTasks', (payload) => {
            console.log("TASKS UPLOADED");
            
            io.emit('getTasks2', payload)
        })

        


        // NEW TASK
        socket.on("new_task", (payload) => {
            console.log(">>>> TASK FROM OVEN!");
            console.log(payload);
            io.emit('added_task', payload)
        });


        // UPDATE TASK
        socket.on('task_update', (payload) => {
            console.log(`TASK ${payload.title} HAS BEEN UPDATED`);
            io.emit('updated_task', payload)
        })


        // DELETED TASK
        socket.on("task_deleted", (payload) => {
            console.log(">>>> TASK DELETED!");
            console.log(payload);
            io.emit('deleted_task', 'PROJECT DELETED')
        });



        //End ON Events
        socket.on('disconnect', () => {
            console.log("SERVER SEZ: UNTIL NEXT TIME!");
        })
    });
    return router;
};