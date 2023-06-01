import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../components/SessionContext";
import { Api, JsonRpc } from "eosjs";
import { ColorRing } from "react-loader-spinner";
import { FaBitcoin } from "react-icons/fa";
import { FcRating } from "react-icons/fc";

const endpoint = import.meta.env.VITE_APP_API_URL; // Use the endpoint of an EOSIO node
const rpc = new JsonRpc(endpoint);

const ClosedEvents = () => {
  const { session } = useContext(SessionContext);
  const [closedEvents, setClosedEvents] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getClosedEvents = async () => {
      setloading(true);
      // fetch the table data from the blockchain
      const result = await rpc.get_table_rows({
        json: true,
        code: import.meta.env.VITE_APP_GETFOZ,
        scope: import.meta.env.VITE_APP_GETFOZ,
        table: "events",
        reverse: true,
        limit: 1000,
      });

      // filter the events that are not resolved and expired
      const now = new Date();
      const closedEvents = result.rows.filter(
        (event) =>
          event.resolved === 0 && new Date(event.expiration + "Z") <= now
      );

      setClosedEvents(closedEvents);
      setloading(false);
    };

    getClosedEvents();
  }, []);

  return (
    <>
      {session ? (
        <>
          {" "}
          <div className="pt-10 pb-14 px-2 xl:px-6 2xl:px-16">
            <h1 className=" text-3xl font-medium ">Closed Events</h1>
            <p className="max-w-[561px] mt-5">
              Explore our 'Closed Events' section - the stage where the trading
              curtain has fallen, but the finale is still a thrilling mystery.
              Trades are off, yet winners remain uncrowned. Stay tuned as we
              unveil the outcomes, and witness the suspense unfurl!
            </p>

            {!loading ? (
              <>
                <div className="cards flex flex-wrap justify-between">
                  {closedEvents.map((event) => (
                    <div key={event.event_id}>
                      <div className="info-container mt-14 max-w-[450px] h-80 md:h-[392px] rounded-lg bg-[#212345] border-[.8px] border-[#363970] ">
                        <div className="bitcoin px-2 md:px-5 items-center flex justify-between py-2 border-b-[1px] border-[#363970] xl:h-32 ">
                          <div className="flex w-9/12 items-center gap-4">
                            <FcRating size={60} />
                            <p className="text-sm  ml-1 ">
                              {event.description}
                            </p>
                          </div>

                          <p className="text-sm xl:text-lg">
                            Event id: # {event.event_id}
                          </p>
                        </div>
                        <div className="">
                          Track on:{" "}
                          <a
                            href={event.source}
                            target="_blank"
                            className="text-[#0BFF]"
                          >
                            Link
                          </a>{" "}
                        </div>

                        <div className="px-2 mt-7 md:px-5 flex flex-col gap-5">
                          <div className="first flex text-xs font-semibold mt-2 justify-between xl:text-xl ">
                            <p className="">
                              Opinion Pool:
                              <span className="font-normal">
                                {" "}
                                {event.total_amount}
                              </span>
                            </p>
                            <p className="">
                              <p>Expired: {event.expiration} </p>
                            </p>
                          </div>

                          <div className="second mt-4 flex text-sm w-full justify-center gap-8">
                            <p>{event.price}</p>
                            <button
                              className={`rounded-xl w-6/12 h-7 bg-[#B9B9B9] xl:h-10`}
                            >
                              {" "}
                              Yes{" "}
                            </button>
                            <p className="text-sm xl:text-lg">
                              {event.yes_bets}traders
                            </p>
                          </div>

                          <div className="third flex text-sm w-full justify-center gap-8">
                            <p>{event.price}</p>
                            <button
                              className={`rounded-xl w-6/12 h-7 bg-[#B9B9B9] xl:h-10`}
                            >
                              {" "}
                              No{" "}
                            </button>
                            <p className="text-sm xl:text-lg">
                              {event.no_bets} traders
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <>Please Login</>
      )}
    </>
  );
};

export default ClosedEvents;
