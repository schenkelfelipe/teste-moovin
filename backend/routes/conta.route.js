let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

let contaSchema = require('../models/Conta');

router.route('/criar-conta').post((req, res, next) => {
  contaSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

router.route('/').get((req, res) => {
  contaSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/editar-conta/:id').get((req, res) => {
  contaSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


router.route('/atualizar-conta/:id').put((req, res, next) => {
  contaSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/deletar-conta/:id').delete((req, res, next) => {
  contaSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;