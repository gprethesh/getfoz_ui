import { Link } from "react-router-dom";
import settings from "../../assets/Group (1).png";
import waves from "../../assets/SVG (2).png";
import wax from "../../assets/SVG (1).png";
import { JsonRpc } from "eosjs";
import { SessionContext } from "../../components/SessionContext"; // Import the SessionContext
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { FiRefreshCcw } from "react-icons/fi";

const endpoint = import.meta.env.VITE_APP_API_URL;
const rpc = new JsonRpc(endpoint);

const MyAccount = () => {
  const { session } = useContext(SessionContext);
  const [loading, setloading] = useState(false);
  const [balance, setBalance] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [data, setData] = useState({
    amount: "",
    displayAmount: "",
    result: "",
  });
  let actor;
  let actorAsString;

  if (session) {
    actor = session.actor;
    actorAsString = actor.toString();
  }

  useEffect(() => {
    const getDeposits = async () => {
      if (session) {
        // fetch the table data from the blockchain
        setloading(true);

        const username = session.actor.toString();

        const result = await rpc.get_table_rows({
          json: true,
          code: import.meta.env.VITE_APP_GETFOZ,
          scope: import.meta.env.VITE_APP_GETFOZ,
          table: "deposits",
          index_position: 1, // Use the byuser index
          key_type: "name", // The type of the user.value (account value)
          lower_bound: username,
          upper_bound: username,
        });

        setBalance(result.rows);
        setloading(false);
      }
    };

    getDeposits();
  }, [session]);

  const depositSection = (
    <div className="first flex mt-10 justify-between  items-center gap-2">
      <div className="flex items-center gap-2">
        <img src={wax} alt="" />
        <p>Deposit</p>
      </div>
      <div className="value flex items-center justify-between px-5 bg-[#363970] w-[270px] h-14 rounded-xl ml-7">
        <div className="left flex gap-3">
          <input
            placeholder="0.00"
            className="bg-[#363970] w-full focus:ring-0 outline-none h-14"
            type="number"
            value={data.amount}
            onChange={(e) => {
              if (e.target.value === "") {
                setData({ ...data, amount: "" });
              } else {
                let inputValue = Number(e.target.value);
                if (!isNaN(inputValue)) {
                  let formattedValue = `${inputValue.toFixed(8)} WAX`;
                  setData({
                    ...data,
                    amount: inputValue,
                    displayAmount: formattedValue,
                  });
                }
              }
            }}
          />
        </div>
        <p className="text-xs">WAXP </p>
      </div>
    </div>
  );

  const withdrawSection = (
    <div className="first flex mt-10 justify-between  items-center gap-2">
      <div className="flex items-center gap-2">
        <img src={wax} alt="" />
        <p>Withdraw</p>
      </div>
      <div className="value flex items-center justify-between px-5 bg-[#363970] w-[270px] h-14 rounded-xl ml-7">
        <div className="left flex gap-3">
          <input
            placeholder="0.00"
            className="bg-[#363970] w-full focus:ring-0 outline-none h-14"
            type="number"
            value={data.amount}
            onChange={(e) => {
              if (e.target.value === "") {
                setData({ ...data, amount: "" });
              } else {
                let inputValue = Number(e.target.value);
                if (!isNaN(inputValue)) {
                  let formattedValue = `${inputValue.toFixed(8)} WAX`;
                  setData({
                    ...data,
                    amount: inputValue,
                    displayAmount: formattedValue,
                  });
                }
              }
            }}
          />
        </div>
        <p className="text-xs">WAXP </p>
      </div>
    </div>
  );

  async function transact() {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    }
    const action = {
      account: "eosio.token",
      name: "transfer",
      authorization: [session.permissionLevel],
      data: {
        from: session.actor,
        to: import.meta.env.VITE_APP_GETFOZ,
        quantity: data.displayAmount,
        memo: "deposit",
      },
    };
    const transactionResult = await session
      .transact({ action }, { broadcast: true })
      .catch((e) => {
        console.log("error caught in transact", e);
        throw e; // re-throw the error to be caught outside
      });

    setData({
      ...data,
      result: transactionResult.response.transaction_id,
    });

    return transactionResult; // Return the result
  }

  async function withdrawx() {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    }
    const action = {
      account: import.meta.env.VITE_APP_GETFOZ,
      name: "withdraw",
      authorization: [session.permissionLevel],
      data: {
        user: session.actor,
        amount: data.displayAmount,
        memo: "withdraw",
      },
    };
    const transactionResult = await session
      .transact({ action }, { broadcast: true })
      .catch((e) => {
        console.log("error caught in transact", e);
        throw e; // re-throw the error to be caught outside
      });

    setData({
      ...data,
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
    if (data.result) {
      successToast(data.result);
      setData((data) => ({ ...data, result: "" }));
    }
  }, [data.result]);

  return (
    <>
      {session ? (
        <>
          <div className="bg-[#181931] text-white py-10 px-2 sm:px-28">
            <h1 className=" text-3xl font-medium ">My Account</h1>
            <p className="max-w-[561px] mt-5">
              The "My Account" section is like your personal treasure chest in
              the GetFoz world. Here, you'll find the deposits you've made into
              the GetFoz smart contract, along with your current balance. And
              guess what? You can also manage your tokens here, making deposits
              or withdrawing them as you please. It's your one-stop shop for all
              things finance!
            </p>
            <div className="containers flex flex-col items-center">
              {!loading ? (
                <>
                  {balance && balance.length > 0 ? (
                    <>
                      {" "}
                      <div className="top-containers flex flex-col lg:flex-row w-full justify-between items-center sm:items-start mt-12 gap-10">
                        <div className="wallet-details w-full lg:w-[661px] h-36">
                          <p className="text-lg font-medium ">Wallet Details</p>
                          <div className="wallet bg-[#212345] w-full h-full rounded-xl border-[0.8px] border-[#363970] flex justify-between px-7 items-center">
                            <div>
                              <p className="text-lg font-medium">
                                Wallet Address
                              </p>
                              <br />
                              <p className="font-light">{balance[0].user}</p>
                            </div>
                            <div>
                              <p className="text-lg font-medium">Balance</p>
                              <p className="font-light">{balance[0].balance}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="top-containers flex flex-col lg:flex-row w-full justify-between items-center sm:items-start mt-12 gap-10">
                        <div className="wallet-details w-full lg:w-[661px] h-36">
                          <p className="text-lg font-medium ">Wallet Details</p>
                          <div className="wallet bg-[#212345] w-full h-full rounded-xl border-[0.8px] border-[#363970] flex justify-between px-7 items-center">
                            <div>
                              <p className="text-lg font-medium">
                                Wallet Address
                              </p>
                              <br />
                              <p className="font-light">{actorAsString}</p>
                            </div>
                            <div>
                              <p className="text-lg font-medium">Balance</p>
                              <p className="font-light">
                                You haven't deposited
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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

              {/*  */}
              <div className=" bg-[#212345] rounded-xl border-[0.8px] border-[#363970] w-[370px] sm:w-[528px] h-[441px] my-20 px-2 sm:px-5">
                <div className="nav flex justify-between border-b-[0.8px] border-[#8182C5] h-10 mt-5 ">
                  <div className="links flex gap-5">
                    {isReversed ? (
                      <>
                        <Link className="decoration-[#0055FF] underline underline-offset-[22px] ">
                          Withdraw To {actorAsString}
                        </Link>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Link className="decoration-[#0055FF] underline underline-offset-[22px] ">
                          Deposit To Getfoz
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/*  */}
                {isReversed ? withdrawSection : depositSection}

                <div
                  className="first flex mt-10 justify-center items-center gap-2"
                  onClick={() => setIsReversed(!isReversed)}
                >
                  <FiRefreshCcw size={40} color="yellow" />
                </div>

                {/*  */}

                {isReversed ? depositSection : withdrawSection}

                {/*  */}
                <button
                  className="bg-[#0055FF] w-full h-14 rounded-2xl mt-9 "
                  onClick={isReversed ? withdrawx : transact}
                >
                  {isReversed ? "Withdraw" : "Deposit"}
                </button>

                {/*  */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <> Please Login</>
      )}
    </>
  );
};

export default MyAccount;
