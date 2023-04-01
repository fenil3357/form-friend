import React, { useEffect, useState } from "react";
import "./Chat.css";

const Group = () => {

  const ClusterId = document.URL.split('/')[4];

  async function fetchGroup() {
    try {
      const url = 'http://127.0.0.1:5000/api/cluster/get-cluster';

      const reqData = {
        ClusterId: ClusterId
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(reqData)
      });

      const data = await response.json();

      if (data.status === false) {
        // setLoading(false);
        // setError(data.Error);
        alert(data.Error);
      } else {
        // setLoading(false);
        // setError('');
        console.log(JSON.stringify(data));
      }
    } catch (error) {
      // setLoading(false);
      // setError("Something went wrong. Please try again!");
      alert(error);
    }
  }

  useEffect((e) => {
    fetchGroup();
  }, [])


  return (<>
    <div className="chat-name"></div>
    <div className="chat-container">
      <div className="message-container"></div>
      {/* <form onSubmit={handleMessageSubmit} className="input-container">
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form> */}
    </div>
  </>
  );
};

export default Group;



