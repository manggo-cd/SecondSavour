import React from "react";

function ReviewCard({ Body, Name }) {
  return (
    <div className="bg-my-green lg:rounded-[1rem] rounded-[0.5rem] min-w-[32.5%] py-[1rem] lg:py-[2rem] px-[1rem] flex flex-col gap-[1rem]">
      <p className="text-white">{Body}</p>
      <p className="text-white font-bold">{Name}</p>
    </div>
  );
}

export default ReviewCard;
