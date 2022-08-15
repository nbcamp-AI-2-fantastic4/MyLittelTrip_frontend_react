const TripCourseItemPreview = ({ value }) => {
  let word = value;
  if (value) {
    if (value.length > 10) {
      word = value.substring(0, 10) + "...";
    }
    return <div className="TripCourseItemPreview">{word}</div>;
  }
};

const TripItem = ({ value, onClick }) => {
  let preview;
  if (value.tripcourse.length > 4) {
    preview = value.tripcourse.slice(0, 4);
  } else {
    preview = value.tripcourse;
  }

  return (
    <div className="TripItem" onClick={onClick}>
      <div className="info-box">
        <p>No. {value.id}</p>
        <p>{value.created_at.slice(0, 10)}</p>
      </div>
      <div className="title-box">
        <h4>{value.title}</h4>
        <p>작성자 : {value.user}</p>
      </div>
      <p>{value.content}</p>
      <div className="tripcourse-box">
        {preview.map((it, idx) => (
          <TripCourseItemPreview key={idx} value={it}></TripCourseItemPreview>
        ))}
        ...
      </div>
    </div>
  );
};

export default TripItem;
