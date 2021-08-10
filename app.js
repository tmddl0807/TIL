const express = require('express');
const cors = require('cors');
const app = express();

// 모든 서버는 요청을 받을수 있는 포트 번호를 필요로 합니다.

// HTTP server의 표준 포트는 보통 80 번 이지만, 보통 다른 서버에서 사용중이기 때문에 접근할 수 없습니다.
// 따라서 우리는 보통 테스트 서버 포트로 3000, 8080, 1337 등을 활용합니다.

// PORT는 아파트의 호수와도 같습니다. 서버로 요청을 받기 위해서는 다음과 같이 포트 번호를 설정 합니다.
// (* 때에 따라 다른 포트번호를 열고 싶다면, 환경 변수를 활용 하기도 합니다.)
const port = 3001;

const flightRouter = require('./router/flightRouter');
const bookRouter = require('./router/bookRouter');
const airportRouter = require('./router/airportRouter');

app.use(cors());
app.use(express.json());

app.use('/flight', flightRouter);
app.use('/book', bookRouter);
app.use('/airport', airportRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome, States Airline!');
});
//get 요청에 한해서 'Welcome, States Airline!'를 보낸다

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString()
  });
});
//app.use : 모든 요청에 동일한 미들웨어 적용
//모든 요청에 대해 status(404)로 'Not Found!'를 보낸다 
//모든 요청에 대해 status(500)으로 'Internal Server Error'를 보내고 error를 핸들링한다
//next는 다음 미들웨어를 샐행한다

app.listen(port, () => {
  console.log(`[RUN] StatesAirline Server... | http://localhost:${port}`);
});

module.exports = app;

// 미들웨어를 사용하는 경우
// 모든 요청에 대해 url이나 메소드를 확인할 때
// POST 요청 등에 포함된 body(payload)를 구조화할 때(쉽게 얻어내고자 할 때)
// 모든 요청/응답에 CORS 헤더를 붙여야 할 때
// 요청 헤더에 사용자 인증 정보가 담겨있는지 확인할 때

//미들웨어 역할
//request에 필요한 기능을 더하거나, 에러를 처리하는 역할
