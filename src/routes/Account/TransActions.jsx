import waves from "../../assets/waves.png";
import { SessionContext } from "../../components/SessionContext";
import { useEffect, useState, useContext } from "react";
import { ColorRing } from "react-loader-spinner";

const TransActions = () => {
  const { session, login, logout } = useContext(SessionContext);
  const [actionTraces, setActionTraces] = useState([]);
  const [loading, setloading] = useState(false);

  let actor;
  let actorAsString;

  if (session) {
    actor = session.actor;
    actorAsString = actor.toString();
  }

  const httpEndpoint = import.meta.env.VITE_APP_API_URL;
  const account = actorAsString;
  const contract = import.meta.env.VITE_APP_GETFOZ;
  const tokenContract = "eosio.token";
  const transferAction = "transfer";

  async function getActions(account, contract) {
    setloading(true);
    const response = await fetch(`${httpEndpoint}/v1/history/get_actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_name: account,
        pos: -1,
        offset: -400, // Increase this value to get more actions
      }),
    });

    const result = await response.json();

    const actionTraces = result.actions
      .filter((action) => {
        const trace = action.action_trace;
        const act = trace.act;
        // Filter actions related to the contract account or token transfers between the account and contract
        return (
          act.account === contract ||
          (act.account === tokenContract &&
            act.name === transferAction &&
            ((act.data.from === account && act.data.to === contract) ||
              (act.data.from === contract && act.data.to === account)))
        );
      })
      .filter((action) => {
        const actionTimestamp = new Date(action.action_trace.block_time);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        return actionTimestamp >= thirtyDaysAgo;
      })
      .map((action) => {
        return {
          ...action.action_trace,
          trx_id: action.action_trace.trx_id,
        };
      });

    setActionTraces(actionTraces);
    setloading(false);
  }

  function main() {
    getActions(account, contract);
  }

  useEffect(() => {
    if (account && contract) {
      main();
    }
  }, [account, contract]); // dependencies

  return (
    <>
      {session ? (
        <>
          <div className="bg-[#181931] text-white py-10 px-2 md:px-28">
            <h1 className=" text-3xl font-medium ">My Transactions</h1>
            <p className="max-w-[561px] mt-5">
              In the "My Transactions" area, you'll find a detailed log of your
              most recent 400 transactions carried out over the past month. From
              successful deposits and withdrawals to every opinion placement,
              this section serves as your personal finance diary, keeping track
              of your every move on the platform. It may take time to load
              depening on the list.
            </p>{" "}
            {!loading ? (
              <>
                <div className="rounded-2xl pb-16 bg-[#212345] max-w-[1289px] text-[10px] md:text-sm font-[#C6C9F4] mt-14 overflow-x-scroll sm:overflow-x-hidden">
                  <table className="w-[550px] sm:w-full">
                    <thead>
                      <tr className="border-b-[0.8px] border-b-[#363970] h-20">
                        <th className="text-center">Transactions</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">To</th>
                        <th className="text-center">Bid</th>
                        <th className="text-center">Event Id</th>
                        <th className="text-center">Memo</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actionTraces.map((trace, i) => (
                        <tr
                          key={i}
                          className="w-full h-16 border-b-[0.8px] border-b-[#363970]"
                        >
                          <td className="text-center">
                            <img
                              className="w-6 h-6 inline-block mr-4"
                              src={waves}
                              alt=""
                            />
                            <p className="inline-block">{trace.act.name}</p>
                          </td>
                          <td className="text-center">
                            {new Date(trace.block_time).toLocaleDateString()}
                          </td>
                          <td className="text-center">
                            {trace.act.data.amount || trace.act.data.quantity}
                          </td>
                          <td className="text-center">{trace.act.data.to}</td>
                          <td className="text-center">
                            {trace.act.data.bet_on !== undefined
                              ? trace.act.data.bet_on
                                ? "Yes"
                                : "No"
                              : ""}
                          </td>

                          <td className="text-center">
                            {trace.act.data.event_id}
                          </td>
                          <td className="text-center">
                            {trace.act.data.memo || ""}
                          </td>

                          <td className="text-center">
                            <div className="w-3 h-3 rounded-full bg-[#0BFF99] inline-block mr-2"></div>
                            <a
                              href={`${import.meta.env.VITE_APP_EXPLORE_URL}${
                                trace.trx_id
                              }`}
                              className="text-[#0BFF]"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {trace.trx_id.substring(0, 14)}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <br></br>
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

export default TransActions;
