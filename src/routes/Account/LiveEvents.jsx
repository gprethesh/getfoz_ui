import { useEffect, useState, useContext } from "react";
import Pagination from "../../components/Pagination";
import { JsonRpc } from "eosjs";
import { SessionContext } from "../../components/SessionContext";
import { FaBitcoin } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { FcRating } from "react-icons/fc";

const endpoint = import.meta.env.VITE_APP_API_URL;
const rpc = new JsonRpc(endpoint);

const LiveEvents = () => {
  const { session } = useContext(SessionContext);
  const [loading, setloading] = useState(false);

  let actor;
  let actorAsString;

  if (session) {
    actor = session.actor;
    actorAsString = actor.toString();
  }

  const [liveEvents, setLiveEvents] = useState([]);

  const [bid, setBid] = useState({
    user: "",
    event_id: "",
    bet_on: "",
    amount: "",
    result: "",
  });

  useEffect(() => {
    const getLiveEvents = async () => {
      setloading(true);

      const result = await rpc.get_table_rows({
        json: true,
        code: import.meta.env.VITE_APP_GETFOZ,
        scope: import.meta.env.VITE_APP_GETFOZ,
        table: "events",
        limit: 1000,
        // index_position: 2,
        // key_type: "i64",
        // lower_bound: 0,
        // upper_bound: 0,
      });

      const now = new Date();
      const liveEvents = result.rows.filter(
        (event) => !event.resolved && new Date(event.expiration + "Z") > now
      );

      setLiveEvents(liveEvents);

      setloading(false);
    };

    getLiveEvents();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveEvents((liveEvents) =>
        liveEvents.map((event) => ({
          ...event,
          countdown: getCountdown(event.expiration),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getCountdown = (expirationTime) => {
    const now = new Date();
    const eventExpiry = new Date(expirationTime + "Z");
    const totalSeconds = (eventExpiry - now) / 1000;

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  async function transact(bid) {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    }
    const action = {
      account: import.meta.env.VITE_APP_GETFOZ,
      name: "placebet",
      authorization: [session.permissionLevel],
      data: {
        user: bid.user,
        event_id: bid.event_id,
        bet_on: bid.bet_on,
        amount: bid.amount,
      },
    };
    const transactionResult = await session
      .transact({ action }, { broadcast: true })
      .catch((e) => {
        console.log("error caught in transact", e);
        throw e; // re-throw the error to be caught outside
      });

    setBid({
      ...bid,
      result: transactionResult.response.transaction_id,
    });

    return transactionResult; // Return the result
  }

  const successToast = (msg) => {
    toast.success(
      <a
        href={`${import.meta.env.VITE_APP_EXPLORE_URL}${msg}`}
        className="text-[#0BFF]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {msg.substring(0, 14)}
      </a>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  useEffect(() => {
    if (bid.result) {
      successToast(bid.result);
      setBid((bid) => ({ ...bid, result: "" }));
    }
  }, [bid.result]);

  return (
    <>
      {session ? (
        <>
          <div className="pt-10 pb-14 px-2 xl:px-6 2xl:px-16">
            <h1 className=" text-3xl font-medium ">Live Events</h1>
            <p className="max-w-[561px] mt-5">
              Step into our 'Live Events' section - the buzzing marketplace of
              opinion trading. Here, the events are alive and the trades are
              driven by your viewpoints. Embrace the excitement, share your
              opinions, and potentially reap the rewards if you're correct. Join
              in now and let your voice shape the outcome!
            </p>

            {!loading ? (
              <>
                <div className="cards flex flex-wrap justify-between">
                  {liveEvents.map((event) => (
                    <div key={event.event_id}>
                      <div className="info-container mt-14 max-w-[450px] h-[452px] rounded-lg bg-[#212345] border-[.8px] border-[#363970] ">
                        <div className="bitcoin px-2 md:px-5 items-center flex justify-between py-2 border-b-[1px] border-[#363970] h-32 ">
                          <div className="flex w-8/12 items-center gap-4">
                            <FcRating size={60} />
                            <p className="text-sm  ml-1 ">
                              {event.description}
                            </p>
                          </div>

                          <p className="text-sm xl:text-lg">
                            Event id: # {event.event_id}
                          </p>
                        </div>

                        <div className="px-2 mt-7 md:px-5 flex flex-col gap-5">
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
                          <div className="first flex text-base font-semibold mt-2 justify-between xl:text-xl ">
                            <p className="">
                              Opinion Pool:
                              <p className="font-normal">
                                {" "}
                                {event.total_amount}
                              </p>
                            </p>
                            <p className="text-base xl:text-lg">
                              <p>Expires in: </p>
                              <p>{getCountdown(event.expiration)}</p>
                            </p>
                          </div>

                          <div className="second mt-4 flex text-xs sm:text-base w-full justify-between items-center ">
                            <p>{event.price}</p>
                            <button
                              className={`rounded-xl w-5/12 h-7 bg-[#FF0000] xl:h-10`}
                              onClick={async () => {
                                const newBid = {
                                  user: actorAsString,
                                  event_id: event.event_id,
                                  bet_on: true,
                                  amount: event.price,
                                };
                                try {
                                  await transact(newBid);
                                } catch (e) {
                                  console.log("Transaction failed", e);
                                }
                              }}
                            >
                              Yes
                            </button>

                            <p className="text-sm xl:text-base">
                              {`${event.yes_bets}  traders`}
                            </p>
                          </div>

                          <div className="third flex text-xs sm:text-base w-full justify-between items-center gap-5">
                            <p>{event.price}</p>
                            <button
                              className={`rounded-xl w-5/12 h-7 bg-[#0055FF] xl:h-10`}
                              onClick={async () => {
                                const newBid = {
                                  user: actorAsString,
                                  event_id: event.event_id,
                                  bet_on: false,
                                  amount: event.price,
                                };
                                try {
                                  await transact(newBid);
                                } catch (e) {
                                  console.log("Transaction failed", e);
                                }
                              }}
                            >
                              No
                            </button>

                            <p className="text-sm xl:text-base">
                              {`${event.no_bets} traders`}
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
                {" "}
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
        <> Please Login</>
      )}
    </>
  );
};

export default LiveEvents;
