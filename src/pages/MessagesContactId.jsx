import { useState, useEffect } from "react";
import { useUser } from "../assets/lib/userFunc";
import { useParams } from "react-router-dom";
import fetchDataContactId from "../assets/fetchDataLib/GET/fetchDataContactId";
import Loading from "../components/Loading";
import TextArea from "../components/TextArea";
import LoadedInputSubmit from "../components/LoadedInputSubmit";
import InfoUserErrorMessage from "../components/InfoUserErrorMessage";

const MessagesContactId = () => {
  const { id } = useParams();
  console.log("id on MessagesContactId:", id);
  const [data, setData] = useState(null);
  console.log("data on MessagesContactId:", data);
  const [reply, setReply] = useState("");
  console.log("reply on MessagesContactId:", reply);
  const [isLoading, setIsLoading] = useState(true);
  const { axios, isSended, setIsSended, setErrorMessage, setInfoUser } =
    useUser();

  useEffect(() => {
    fetchDataContactId(axios, id, setData, setIsLoading);
  }, [axios, id]);

  const handleRespContactId = async (e) => {
    e.preventDefault();
    setIsSended(true);
    const formData = new FormData();
    formData.append("reply", reply);

    try {
      const response = await axios.post(
        `http://localhost:3000/messagesContactId/${id}`,
        formData
      );
      if (response.data) {
        console.log("response.data:", response.data);
        setInfoUser(response.data.message);
        setIsLoading(false);
        setIsSended(false);
      }
    } catch (error) {
      console.log("error:", error);
      setTimeout(() => {
        setIsSended(false);
        setErrorMessage("");
      }, 3000);
      setErrorMessage(error.response.data);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="boxMessagesContactId">
      <div className="wrapper">
        <div className="leftMessageId">
          <div className="boxMssgContactId">
            <div>{data?.owner?.account?.username}</div>
            <div>{data?.owner?.email}</div>
            <div>{data?.messageContact}</div>
            <div>{data?.date}</div>
          </div>
        </div>
        <div className="rightMessageRespondId">
          <div className="TitleResponseContactId">
            <h3>Reply</h3>
          </div>
          <form className="boxFormContactId" onSubmit={handleRespContactId}>
            <TextArea
              setState={setReply}
              value={reply}
              name="Respond"
              id="Respond"
            />
            <LoadedInputSubmit
              isSended={isSended}
              setIsSended={setIsSended}
              value="Reply"
            />
            <InfoUserErrorMessage />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesContactId;
