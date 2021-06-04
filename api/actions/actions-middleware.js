const yup = require('yup')
const Actions = require('./actions-model')

function logger(req, res, next) {
    console.log(`
    ${req.method} request to ${req.baseUrl}
    req.body ${JSON.stringify(req.body)}
    req.params.id ${req.params.id}`)
}

async function checkActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            next({
                status: 404,
                message: `action with id ${action} does not exist`
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

const actionSchema = yup.object({
    project_id: yup.number()
    .required(`project id required`),
    desription: yup.string()
    .trim()
    .required(`enter action description`)
    .max(128, `description must be under 128 characters`),
    notes: yup.string()
    .trim()
    .required(`action notes required`),
    completed: yup.boolean()
})

async function validateAction(req, res, next) {
    try {
        const validated = await messageSchema.validate(req.body, {
          stripUnknown: true,
        })
        req.body = validated
        next()
      } catch (err) {
        // here validation failed
        next({ status: 400, message: err.message })
      }
}

module.exports = {
    logger,
    checkActionId,
    validateAction
} 