import { useEffect, useState, useContext } from "react";
import Pagination from "../../components/Pagination";
import { JsonRpc } from "eosjs";
import { SessionContext } from "../../components/SessionContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";

const endpoint = import.meta.env.VITE_APP_API_URL;
const rpc = new JsonRpc(endpoint);

const MyTrade = () => {
  const { session } = useContext(SessionContext);
  const [loading, setloading] = useState(false);
  const [bets, setBets] = useState([]);

  // let actor;
  // let actorAsString;

  // if (session) {
  //   actor = session.actor;
  //   actorAsString = actor.toString();
  // }

  useEffect(() => {
    const getLiveEvents = async () => {
      // fetch the table data from the blockchain
      setloading(true);

      const username = session.actor.toString();

      const result = await rpc.get_table_rows({
        json: true,
        code: import.meta.env.VITE_APP_GETFOZ,
        scope: import.meta.env.VITE_APP_GETFOZ,
        table: "bets",
        index_position: 2, // Use the byuser index
        key_type: "name", // The type of the user.value (account value)
        lower_bound: username,
        upper_bound: username,
      });

      setBets(result.rows);
      setloading(false);
    };

    getLiveEvents();
  }, [session]);

  return (
    <>
      {session ? (
        <>
          <div className="pt-10 pb-14 px-2 xl:px-6 2xl:px-16">
            <h1 className=" text-3xl font-medium ">My Trade</h1>
            <p className="max-w-[561px] mt-5">
              In the "My Trades" section, you'll find a comprehensive list of
              all your ongoing opinion trades. You can quickly check whether
              your opinion has found a worthy adversary, or if it's still
              waiting in the wings for its match. Stay tuned!
            </p>
            {!loading ? (
              <>
                <div className="cards flex flex-wrap justify-between">
                  {bets.map((bets) => (
                    <div
                      key={bets.bet_id}
                      className="info-container mt-14 w-[454px] h-80 md:h-[392px] rounded-lg bg-[#212345] border-[.8px] border-[#363970] "
                    >
                      <div className="bitcoin px-2 md:px-5 items-center flex justify-between py-2 border-b-[1px] border-[#363970] xl:h-32 ">
                        <div className="flex w-9/12 items-center gap-4">
                          {bets.matched_with === null ||
                          bets.matched_with === undefined ? (
                            <FaTimes color="red" size={60} />
                          ) : (
                            <FaCheck color="green" size={60} />
                          )}

                          <p className="text-sm 2xl:text-md ml-1 ">
                            Trade Matched :{" "}
                            {bets.matched_with === null ||
                            bets.matched_with === undefined
                              ? "NO"
                              : "YES"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 pt-10 text-lg font-medium">
                        <div className="w-full flex justify-between px-5">
                          <p>Your Opinion</p>
                          <p>Bid</p>
                        </div>
                        <div className="w-full flex justify-between px-5">
                          <p>
                            {bets.bet_on === 1
                              ? "YES"
                              : bets.bet_on === 0
                              ? "NO"
                              : ""}
                          </p>
                          <p>{bets.amount}</p>
                        </div>
                        <div className="w-full flex justify-between px-5">
                          <p>
                            Event Id:
                            <span className="text-base font-light ml-2">
                              {bets.event_id}
                            </span>{" "}
                          </p>
                        </div>
                        <div className="w-full flex justify-between px-5">
                          <p>Your ID: </p>
                          <p>{bets.bet_id}</p>
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

export default MyTrade;
