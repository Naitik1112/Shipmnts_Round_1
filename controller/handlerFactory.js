const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.create = Model => 
    catchAsync( async (req, res, next) => {
        const doc = Model.create(req.body)

        if (!doc) {
            return (new AppError('Failed to create data',404))
        }

        res.status(201).json({
            status : 'success',
        })
    })