
import React from "react";
import MessengerCustomerChat from 'react-messenger-customer-chat';

function MessengerChat() {
  return (
    <div className="fixed bottom-5 right-5">
      <MessengerCustomerChat
        pageId="282762553571694"
        appId="656867348629654"
        htmlRef="<REF_STRING>"
      />
    </div>
  );
}

export default MessengerChat;
