const { request } = require('express');
const flights = require('../repository/flightList');
// 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 데이터 혹은 요청 된 flight_uuid, phone 값과 동일한 예약 데이터를 조회합니다.
  findById: async (req, res) => {
   
    if (req.query.flight_uuid !== undefined) {
      let onlyquery = booking.filter(item => item.flight_uuid === req.query.flight_uuid);
      return res.status(200).json(onlyquery);
    }
    if (req.query.phone !== undefined) {
      let onlyquery = booking.filter(item => item.phone === req.query.phone);
      if (onlyquery.length === 0) {
        return res.status(404).json([]);
      }
      let [{ uuid, flight_uuid, name, phone }] = onlyquery;
      return res.status(200).json({ uuid, flight_uuid, name, phone });
    }
    return res.status(200).json(booking);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  create: async (req, res) => {
    
    let { flight_uuid, name, phone } = req.body;
    booking.push({
      flight_uuid,
      name,
      phone
    });
    //req.body는 주소에선 확인할 수 없고 post method를 사용할 때 쓴다. 
    return res.status(201).json({ message: 'Create success!' });
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: async (req, res) => {
    
    booking = booking.filter(item => req.query.phone !== item.phone);
    return res.status(200).json(booking);
    // booking에 있는 element를 phone값과 동일한 데이터를 제외하고 전부 삭제
  }
};
