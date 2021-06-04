// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')
const router = express.Router()

router.get('/', (req,res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(foundProject => {
        if(!foundProject) {
            res.status(404).json({
                message: `That's not here`
            })
        } else {
            res.status(200).json(foundProject)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

router.get('/:id/actions', (req, res) => {
 Projects.getProjectActions(req.params.id)
   .then(actions => {
           res.status(200).json(actions)
   })
   .catch(err => {
       res.status(500).json({
           message: err
       })
   })
})

router.post('/', (req, res) => {
    const newProject = req.body
    if(!newProject.name || !newProject.description) {
        res.status(400).json({
            message: `provide project name and description`
        })
    }
    Projects.insert(newProject)
    .then(addProject => {
            res.status(201).json(addProject)
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

router.put('/:id', (req, res) => {
    const projectId = req.params.id
    const editedData = req.body
    if(!projectId || !editedData.name || !editedData.description) {
        res.status(400).json({
            message: `project does not exist`
        })
    }
    Projects.update(projectId, editedData)
    .then(editedProject => {
        console.log(editedProject)
            res.status(200).json(editedProject)
    })
    .catch(err => {
        res.status(500).json({
            error: `post not found`,
            message: err.message,
            stack: err.stack
        })
    })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(removeProject => {
        if (!removeProject) {
            res.status(404).json({
                message: `project does not exist and therefore cannot be removed`
            })
        } else {
            res.status(200).json(removeProject)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

module.exports = router