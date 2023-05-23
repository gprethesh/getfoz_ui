import bitlogo from "../assets/Group 1000003547.png";
// eslint-disable-next-line
const InfoCard = ({ firstColor, secondColor }) => {
  return (
    <div className="info-container mt-14 max-w-[454px] h-80 md:h-[392px] rounded-lg bg-[#212345] border-[.8px] border-[#363970] ">
      <div className="bitcoin px-2 md:px-5 items-center flex justify-between py-2 border-b-[1px] border-[#363970] xl:h-32 ">
        <div className="flex w-9/12 items-center gap-4">
          <img className="w-16 h-16" src={bitlogo} alt="" />
          <p className="text-sm 2xl:text-md ml-1 ">
            Bitcoin to be priced at 28853.81 USDT or more at 08:10 PM?
          </p>
        </div>
        <p className="text-sm xl:text-lg">#Cricket</p>
      </div>
      <div className="flex flex-col gap-6 pt-10 text-lg font-medium">
        <div className="w-full flex justify-between px-5">
          <p>Your Opinion</p>
          <p>Bid</p>
        </div>
        <div className="w-full flex justify-between px-5">
          <p>Yes</p>
          <p>20 WAX</p>
        </div>
        <div className="w-full flex justify-between px-5">
          <p>
            Start Time <span className="text-base font-light ml-2">08:10 PM</span>{" "}
          </p>
          <p>
            End Time <span className="text-base font-light ml-3">4h 20m 30sec</span>{" "}
          </p>
        </div>
        <div className="w-full flex justify-between px-5">
          <p>Matched</p>
          <p>Yes</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
