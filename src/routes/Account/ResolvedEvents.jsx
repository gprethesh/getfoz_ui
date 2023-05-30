import { useEffect, useState, useContext } from "react";
import { JsonRpc } from "eosjs";
import { SessionContext } from "../../components/SessionContext";
import { FaBitcoin } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import Pagination from "../../components/Pagination";
import { FcRating } from "react-icons/fc";

const endpoint = import.meta.env.VITE_APP_API_URL;
const rpc = new JsonRpc(endpoint);

const ResolvedEvents = () => {
  const { session } = useContext(SessionContext);
  const [loading, setloading] = useState(false);

  let actor;
  let actorAsString;

  if (session) {
    actor = session.actor;
    actorAsString = actor.toString();
  }

  const [liveEvents, setLiveEvents] = useState([]);

  useEffect(() => {
    const getLiveEvents = async () => {
      // fetch the table data from the blockchain
      setloading(true);

      const result = await rpc.get_table_rows({
        json: true,
        code: import.meta.env.VITE_APP_GETFOZ,
        scope: import.meta.env.VITE_APP_GETFOZ,
        table: "events",
        reverse: true,
        limit: 1000,
      });

      // filter for the events that are resolved
      const resolvedEvents = result.rows.filter((event) => event.resolved);

      setLiveEvents(resolvedEvents);
      setloading(false);
    };

    getLiveEvents();
  }, []);

  return (
    <>
      {session ? (
        <>
          {" "}
          <div className="pt-10 pb-14 px-2 xl:px-6 2xl:px-16">
            <h1 className=" text-3xl font-medium ">Resolved Events</h1>
            <p className="max-w-[561px] mt-5">
              In the "Resolved Events" section, you'll discover events that have
              reached their grand finale, with winners declared for all to see.
              Look out for the win or lose tags adorning the 'yes' and 'no'
              options - they're your roadmap to understanding the outcome of
              each event.
            </p>
            {!loading ? (
              <>
                <div className="cards flex flex-wrap justify-between">
                  {liveEvents.map((event) => (
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
                          </div>

                          <div className="second mt-4 flex text-sm w-full justify-center gap-8">
                            <p>{event.price}</p>
                            <button
                              className={`rounded-xl w-6/12 h-7 bg-[#B9B9B9] xl:h-10`}
                            >
                              {" "}
                              Yes{" "}
                            </button>

                            {event.resolved && event.outcome === 1 ? (
                              <p className="text-lg text-[#0055FF] font-medium">
                                win
                              </p>
                            ) : (
                              <p className="text-base text-[#FF0000] font-medium">
                                lose
                              </p>
                            )}
                          </div>

                          <div className="third flex text-sm w-full justify-center gap-8">
                            <p>{event.price}</p>
                            <button
                              className={`rounded-xl w-6/12 h-7 bg-[#B9B9B9] xl:h-10`}
                            >
                              {" "}
                              No{" "}
                            </button>
                            {event.resolved && event.outcome === 0 ? (
                              <p className="text-lg text-[#0055FF] font-medium">
                                win
                              </p>
                            ) : (
                              <p className="text-base text-[#FF0000] font-medium">
                                lose
                              </p>
                            )}
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
        <>Please Login</>
      )}
    </>
  );
};

export default ResolvedEvents;
