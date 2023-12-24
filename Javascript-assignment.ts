"Make a dropdown of Red,blue and green. On selecting dropdown backround color changes";
"Make a stopwatch with start stop and reset.";
"Make an image carousel with  images :";
"https://source.unsplash.com/random?landscape,mountain";
"https://source.unsplash.com/random?landscape,cars";
"https://source.unsplash.com/random?landscape,night";
"https://source.unsplash.com/random?landscape,city";

"Make a chat interface with header as chat , footer has input and send. On clicking send msg should be sent in body";
"Make a notification containg avatar name and Name sennt you message and make them disappear after 5 sec to a box";

"Render posts with search in  header and pagination in footerdisplay at most 5 posts in each page ";
const posts = [
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Garima",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hours.Hello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hours",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Reply",
    from: {
      name: "Viniket",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Reply",
    from: {
      name: "Bhushan",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Tanvi",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Rahul",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Deeksha",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Swati",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Ketki",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Preksha",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Sonali",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Gagan",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Pratiksha",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Reply",
    from: {
      name: "Bhagyashree",
      email: "garima@gmail.com",
    },
  },
  {
    fullText:
      "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Milind",
      email: "garima@gmail.com",
    },
  },
];
