// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const router = express.Router()

// [GET] /api/actions
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [GET] /api/actions/:id
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(foundAction => {
        if(!foundAction) {
            res.status(404).json({
                message: `action does not exist`
            })
        } else {
            res.status(200).json(foundAction)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [POST] /api/actions
router.post('/', (req, res) => {
    const newAction = req.body
    if (
        !newAction.project_id 
        || !newAction.description 
        || !newAction.notes
    ) {
        res.status(400).json({
            message: `provide project id, description, and notes to this action`
        })
    }
    Actions.insert(newAction)
    .then((addAction) => {
            res.status(201).json(addAction)
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [PUT] /api/actions/:id
router.put('/:id', (req, res) => {
    const actionId = req.params.id
    const editAction = req.body
    if(
        !actionId 
        || !editAction.project_id 
        || !editAction.description 
        || !editAction.notes
    ) {
        res.status(400).json({
            message: `action does not exist`
        })
    }
    Actions.update(actionId, editAction)
    .then(editedAction => {
        res.status(201).json(editedAction)
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})
// [DELETE] /api/actions/:id
router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(removeAction => {
        if(!removeAction) {
            res.status(404).json({
                message: `action does not exist and therefore cannot be removed`
            })
        } else {
            res.status(200).json(removeAction)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

module.exports = router 