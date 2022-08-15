import React from "react";
import Button from "./Button";

const ItemList = ({ value, onClick, onClick2 }) => {
  return (
    <div className="ItemList">
      <div className="title-box">
        <h4>여행 일정</h4>
        <Button text={"더보기"} onClick={onClick}></Button>
      </div>
      <div className="list-box">
        {value.map((it) => (
          <div className="trip-box" key={it.id} onClick={() => onClick2(it.id)}>
            <p className="trip-title">{it.title}</p>
            <p className="trip-user">{it.user}</p>
            <p className="trip-date">{it.created_at.slice(0, 10)}</p>
            <p className="trip-content">{it.content}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ItemList);
