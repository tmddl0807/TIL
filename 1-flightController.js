const flights = require('../repository/flightList');

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: async (req, res) => {
    
    if (req.query.departure_times !== undefined && req.query.arrival_times !== undefined)
    // request에서 요청한 데이터: req.query.key로 표현, 주소에서 ? 다음에 오는 정보
    {
      let flightlist = flights.filter((item) => {
        return new Date(item.departure_times).getDate() === new Date(req.query.departure_times).getDate() &&
            new Date(item.arrival_times).getDate() === new Date(req.query.arrival_times).getDate();
      });
      // new Date().getDate() method : 지정된 값의 날짜 부분 반환
      return res.status(200).json(flightlist);
      // status(200): 요청 성공 (GET: 리소스를 불러와서 메시지 바디에 전송)
    }

    if (req.query.departure !== undefined && req.query.destination !== undefined) {
      let flightlist = flights.filter((item) => {
        return item.departure === req.query.departure && item.destination === req.query.destination;
      });
      return res.status(200).json(flightlist);
    }

    return res.json(flights); //객체가 JSON 문자열로 변환되서 body라는 변수에 저장

  },


  // [GET] /flight/{:id}
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: async (req, res) => {
    
    let flightdata = flights.filter(item => req.params.id === item.uuid);
    if (flightdata.length > 0) {
      return res.status(200).json(flightdata);
    } 
    //중요
    //req.params는 url을 분석하여 id와 name자리에 있는 값을 가져온다
    //url에서 ?뒤에 입력되는 query문은 req.query로 받아온다

    else {
      return res.status(404).json(null);
    }s
    //status(404): 요청받은 리소스를 찾을 수 없음, 요청한 데이터가 없으면 여기에 null을 넘긴다

  },

  // [PUT] /flight/{:id} 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요청 된 Body 데이터로 수정합니다.
  update: async (req, res) => {
    let data;
   
    flights.forEach((item) => {
      if (req.params.id === item.uuid) {
        if (req.body.departure !== undefined) { item.departure = req.body.departure; }
        if (req.body.destination !== undefined) { item.destination = req.body.destination; }
        if (req.body.departure_times !== undefined) { item.departure_times = req.body.departure_times; }
        if (req.body.arrival_times !== undefined) { item.arrival_times = req.body.arrival_times; }
        data = item;
      }
    });
    // PUT method는 request payload를 사용해 새로운 리소스를 생성하거나, 대상 리소스를 나타내는 데이터를 대체
    // item의 모든 key를 요청한 값으로 바꿈
    // item(flights의 모든 객체)을 data에 선언하고 status(200)으로 전달
  
    return res.status(200).json(data);
  }
};
