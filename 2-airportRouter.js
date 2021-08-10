//라우팅: 클라이언트의 요청에 해당하는 메소드와 Endpoint에 따라 서버가 응답하는 방법을 결정하는 것

airportRouter
const { findAll } = require('../controller/airportController');
const exress = require('express');
const router = exress.Router();

router.get('/', findAll);

module.exports = router;

bookRouter
const { findById, create, deleteById } = require('../controller/bookController');
const exress = require('express');
const router = exress.Router();

router.get('/', findById);

router.post('/', create);

router.delete('/', deleteById);

module.exports = router;

flightRouter
const { findAll, findById, update } = require('../controller/flightController');
const exress = require('express');
const router = exress.Router();

router.get('/', findAll);

router.get('/:id', findById);

router.put('/:id', update);

module.exports = router;


// router.req.method(req.url, function (req,res))의 형태로 쓸 수 있다