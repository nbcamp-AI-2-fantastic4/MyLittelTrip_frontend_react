const TripCourseItem = ({ value }) => {
  const s = {
    month: value.start_at.substring(5, 7),
    day: value.start_at.substring(8, 10),
    hour: value.start_at.substring(11, 13),
    minute: value.start_at.substring(14, 16),
  };

  const e = {
    month: value.end_at.substring(5, 7),
    day: value.end_at.substring(8, 10),
    hour: value.end_at.substring(11, 13),
    minute: value.end_at.substring(14, 16),
  };

  return (
    <div className="TripCourseItem">
      <div className="time-box">
        <div>
          <div>시작</div>
          <div>
            <p>
              {s.month}월 {s.day}일
            </p>
            <p>
              {s.hour}시 {s.minute}분
            </p>
          </div>
        </div>
        <div>
          <div>종료</div>
          <div>
            <p>
              {e.month}월 {e.day}일
            </p>
            <p>
              {e.hour}시 {e.minute}분
            </p>
          </div>
        </div>
      </div>

      <div className="doing-box">
        <h4>{value.tripcoursetype}</h4>
        <p>{value.doing}</p>
      </div>
    </div>
  );
};

export default TripCourseItem;
