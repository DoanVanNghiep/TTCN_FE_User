import React from "react";
import Script from "next/script";

function PluginChat(props) {
  return (
    <div>
      {/* Messenger Chat plugin Code  */}
      <div id="fb-root"></div>

      {/* Your Chat plugin code */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>

      <Script id="customer-chat">
        {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "105935772474483");
            chatbox.setAttribute("attribution", "biz_inbox");
        `}
      </Script>
      <Script id="SDKCode">
        {`
            window.fbAsyncInit = function() {
            FB.init({
                xfbml            : true,
                version          : 'v18.0'
                });
            };
                    
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
                
        `}
      </Script>
    </div>
  );
}

export default PluginChat;

// //  Your SDK code
// <script>
// </script>
