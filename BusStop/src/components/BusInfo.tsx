import "../App.css";

const BusInfo = () => {
  return (
    <div className="busInfo-wrapper">
      <h3>버스 운행정보</h3>
      <h4>운행지역</h4>
      <span>하단역 &#8596; 한림생활관 </span>
      <h4>운행시간 (하단역 출발기준) </h4>
      <span>방학/주말: 07:00~22:00</span>
      <h4>배차간격</h4>
      <span>10분~30분</span>
      <h4>운임</h4>
      <div className="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">현금</th>
                    <th scope="col">카드</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">성인</th>
                    <td>1600원</td>
                    <td>1480원</td>
                </tr>
                <tr>
                    <th scope="row">청소년</th>
                    <td>900원</td>
                    <td>750원</td>
                </tr>
            </tbody>
        </table>
      </div>
      <small>위 정보들은 버스회사의 운행상황에 따라 달라질 수 있습니다.</small>
    </div>
  );
};

export default BusInfo;
