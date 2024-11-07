// import the .env file so that we can keep our password outside of our script
require("dotenv").config();

// importing the masto library to interface with our mastodon server
const m = require("masto");

const masto = m.createRestAPIClient({
  url: "https://networked-media.itp.io/", // this is our mastodon server
  accessToken: process.env.TOKEN,
});

async function makeStatus(text) {
  const status = await masto.v1.statuses.create({
    status: text,
    visibility: "public",
  });

  console.log(status.url);
}

async function grabJoke() {
  // let params = new URLSearchParams({
  //   apiKey: "9aa8e798",
  //   s: "",
  //   type: "movie",
  // });
  // let url = "http://www.omdbapi.com/?" + params;
  let url = "https://official-joke-api.appspot.com/random_joke";
  // console.log(url);
  let response = await fetch(url);
  // console.log(response);
  let jsonData = await response.json().then(success, error);

  // console.log(joke);
}

function success(jsonData) {
  // let joke = response.Search;
  // console.log(jsonData);
  let setup = jsonData.setup;
  let punchline = jsonData.punchline;
  let joke = setup + "\n" + punchline + "!";
  // console.log(joke);
  makeStatus(joke);
}
function error(e) {
  console.log(e);
}

function multipleStatuses() {
  grabJoke();
}
setInterval(multipleStatuses, 900000);

const stream = m.createStreamingAPIClient({
  accessToken: process.env.TOKEN,
  streamingApiUrl: "wss://networked-media.itp.io", // special url we use for sockets
});

// async function to wait for the notification and reply to it
async function reply() {
  // finding the specific route to watch for notifications
  // based off the stream client and the notification path
  const notificationSubscription = await stream.user.notification.subscribe();

  // makes sure objects exist in the returned obj before going through array
  for await (let notif of notificationSubscription) {
    // printing the structure to the console to see how to access data
    // console.log(notif.payload);

    // local variables for each piece of data i want
    //
    // if the type of notification is a mention
    if (notif.payload.type == "mention") {
      let acct = notif.payload.account.acct;
      let replyId = notif.payload.status.id;
      let emojiresponse = notif.payload.status.content;
      // console.log(emojiresponse);
      let hasemoji = /\p{RGI_Emoji}/v.test(emojiresponse);
      if (hasemoji) {
        const status = await masto.v1.statuses.create({
          status: ` 👁!`, // reply to user that originally mentioned
          visibility: "public",
          in_reply_to_id: replyId, // id # of the mention post so that you reply in the thread
        });
      } else {
        const status = await masto.v1.statuses.create({
          status: ` hello!`, // reply to user that originally mentioned
          visibility: "public",
          in_reply_to_id: replyId, // id # of the mention post so that you reply in the thread
        });
      }
      // create a status
      // const status = await masto.v1.statuses.create({

      //   status: `@${acct} hi back!`, // reply to user that originally mentioned
      //   visibility: "public",
      //   in_reply_to_id: replyId, // id # of the mention post so that you reply in the thread
      // });
    }
  }
}

// call the reply function so it can always wait for notifications
reply();
