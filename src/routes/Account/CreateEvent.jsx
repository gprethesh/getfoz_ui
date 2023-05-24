import React from "react";
import Card from "../../components/Card";
import { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../components/SessionContext";
import { Api, JsonRpc } from "eosjs";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const endpoint = import.meta.env.VITE_APP_API_URL; // Use the endpoint of an EOSIO node
const rpc = new JsonRpc(endpoint);

const CreateEvent = () => {
  const { session } = useContext(SessionContext);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({
    description: "",
    event_creator: "",
    event_id: "",
    expiration_seconds: "",
    source: "",
    tag: "",
    price: "",
    result: "",
  });

  let actor;
  let actorAsString;

  if (session) {
    actor = session.actor;
    actorAsString = actor.toString();
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function transact(data) {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    }
    const action = {
      account: import.meta.env.VITE_APP_GETFOZ,
      name: "createvent",
      authorization: [session.permissionLevel],
      data: {
        description: data.description,
        event_creator: data.event_creator,
        event_id: data.event_id,
        expiration_seconds: data.expiration_seconds,
        source: data.source,
        tag: data.tag,
        price: data.price,
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

  function getTimeFromNow(seconds) {
    const now = new Date();

    now.setSeconds(now.getSeconds() + parseInt(seconds));

    return now.toLocaleString();
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
      setData({
        description: "",
        event_creator: "",
        event_id: "",
        expiration_seconds: "",
        source: "",
        tag: "",
        price: "",
        result: "",
      });
    }
  }, [data.result]);

  return (
    <>
      {session ? (
        <>
          {" "}
          <div className="pt-10 pb-14 px-2 xl:px-6 2xl:px-16">
            <h1 className=" text-3xl font-medium ">Create Event</h1>

            <div className="cards flex flex-wrap justify-between">
              <div className="w-full max-w-lg mx-auto mt-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="description"
                      type="text"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="event_creator"
                    >
                      Event Id
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="event_idr"
                      type="number"
                      name="event_id"
                      value={data.event_id}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="source"
                    >
                      Event Source
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="source"
                      type="text"
                      name="source"
                      value={data.source}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="tag"
                    >
                      Event Tag
                    </label>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="tag"
                      name="tag"
                      value={data.tag}
                      onChange={handleChange}
                    >
                      <option value="">Select tag</option>
                      <option value="ECONOMY">ECONOMY</option>
                      <option value="YOUTUBE">YOUTUBE</option>
                      <option value="WORLD">WORLD</option>
                      <option value="CRYPTO">CRYPTO</option>
                      <option value="SOCIAL">SOCIAL</option>
                    </select>
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="price"
                    >
                      Event Price
                    </label>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="price"
                      name="price"
                      value={data.price}
                      onChange={handleChange}
                    >
                      <option value="">Select price</option>
                      <option value="20.00000000 WAX">20.00000000 WAX</option>
                      <option value="50.00000000 WAX">50.00000000 WAX</option>
                      <option value="100.00000000 WAX">100.00000000 WAX</option>
                      <option value="200.00000000 WAX">200.00000000 WAX</option>
                    </select>
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="expiration_seconds"
                    >
                      Expiration Seconds
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="expiration_seconds"
                      type="text"
                      name="expiration_seconds"
                      value={data.expiration_seconds}
                      onChange={handleChange}
                    />
                    <p className="text-xs italic">
                      {getTimeFromNow(data.expiration_seconds)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      const newEvent = {
                        description: data.description,
                        event_creator: actorAsString,
                        event_id: data.event_id,
                        source: data.source,
                        tag: data.tag,
                        price: data.price,
                        expiration_seconds: data.expiration_seconds,
                      };
                      try {
                        await transact(newEvent);
                      } catch (e) {
                        console.log("Creation of the event failed", e);
                      }
                    }}
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Please Login</>
      )}
    </>
  );
};

export default CreateEvent;
