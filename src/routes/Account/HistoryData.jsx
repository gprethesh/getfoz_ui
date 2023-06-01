import { useEffect, useState, useContext } from "react";
import Pagination from "../../components/Pagination";
import { JsonRpc } from "eosjs";
import { SessionContext } from "../../components/SessionContext";
import { FaBitcoin } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { FcRating } from "react-icons/fc";
import waves from "../../assets/waves.png";

const endpoint = import.meta.env.VITE_APP_API_URL;
const rpc = new JsonRpc(endpoint);

const HistoryData = () => {
  const { session } = useContext(SessionContext);
  const [loading, setloading] = useState(false);

  let actor;
  let actorAsString;

  if (session) {
    actor = session.actor;
    actorAsString = actor.toString();
  }

  const [historyInfo, setHistoryInfo] = useState([]);

  useEffect(() => {
    const getLiveEvents = async () => {
      if (session) {
        setloading(true);

        const username = session.actor.toString();

        const result = await rpc.get_table_rows({
          json: true,
          code: import.meta.env.VITE_APP_GETFOZ, // smart contract name
          scope: import.meta.env.VITE_APP_GETFOZ, // scope, usually the contract account
          table: "history", // table name
          index_position: 2, // secondary index position
          key_type: "name",
          lower_bound: username,
          upper_bound: username,
          reverse: true,
          limit: 50,
        });

        setHistoryInfo(result.rows);

        setloading(false);
      }
    };

    getLiveEvents();
  }, [session]);

  console.log(`historyInfo`, historyInfo);
  return (
    <>
      {session ? (
        <>
          <div className="pt-10 pb-14 px-2 xl:px-6 2xl:px-16">
            <h1 className=" text-3xl font-medium ">History</h1>
            <p className="max-w-[561px] mt-5">
              In the history section, you have access to a complete record of
              all your trades. This includes trades you've won, trades you've
              lost, and trades that didn't match, resulting in a refund of your
              amount.
            </p>

            {!loading ? (
              <>
                {historyInfo && historyInfo.length > 0 ? (
                  <div className="rounded-2xl pb-16 bg-[#212345] max-w-[1289px] text-[10px] md:text-sm font-[#C6C9F4] mt-14 overflow-x-scroll sm:overflow-x-hidden">
                    <table className="w-[550px] sm:w-full">
                      <thead>
                        <tr className="border-b-[0.8px] border-b-[#363970] h-20">
                          <th className="text-center">No</th>
                          <th className="text-center">Event Id</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">User</th>
                          <th className="text-center">Amount</th>
                        </tr>
                      </thead>

                      {historyInfo.map((info, i) => (
                        <tbody key={i}>
                          <tr className="w-full h-16 border-b-[0.8px] border-b-[#363970]">
                            <td className="text-center">
                              <img
                                className="w-6 h-6 inline-block mr-4"
                                src={waves}
                                alt=""
                              />
                              <p className="inline-block">{info.history_id}</p>
                            </td>
                            <td className="text-center">{info.event_id}</td>
                            <td className="text-center">{info.status}</td>
                            <td className="text-center">{info.user}</td>
                            <td className="text-center">{info.amount}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center items-center text-info bg-info ">
                    No History Found
                  </div>
                )}
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

export default HistoryData;
