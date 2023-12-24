
const main=document.querySelector('main')

const posts = [{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Garima",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hours.Hello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hoursHello this is just some random post created to show an example mock post for this coding challenge. this needs to be completed in two hours",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Reply",
    from: {
      name: "Viniket",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Reply",
    from: {
      name: "Bhushan",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Tanvi",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Rahul",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Deeksha",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Swati",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Ketki",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Preksha",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Sonali",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Gagan",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Pratiksha",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Reply",
    from: {
      name: "Bhagyashree",
      email: "garima@gmail.com"
    }
  },{
    fullText: "Hello this is just some random post created to show an example mock    post for this coding challenge",
    dateTimeCreated: "2020-07-20T18:44:11Z",
    dateTimeLastModified: "2020-07-20T18:44:11Z",
    type: "Post",
    from: {
      name: "Milind",
      email: "garima@gmail.com"
    }
  }];

  const pages=5;
  let currentIndex=1;
  function renderPosts(start,end) {
     posts.slice(start,end).map((post, index) => {
        const card = document.createElement("div");
        const header =document.createElement("div");
        header.classList.add("card-header");
        const title=document.createElement("p")
        card.classList.add("card");
        const status=post.status==="Post" ? "Posted":"Replied";
        title.textContent= post.from.name + " " + status
        const timeStamp=document.createElement("p")
        const date= new Date(post.dateTimeLastModified)
        const time=date.toLocaleTimeString()
        timeStamp.textContent=time;
        timeStamp.classList.add("time-stamp")
        title.classList.add("title")
        header.appendChild(title);
        header.appendChild(timeStamp);
        const content=document.createElement("p")
        content.textContent=post.fullText;
        content.classList.add("content")
        card.appendChild(header);
        card.appendChild(content);
        main.appendChild(card);
    //   return (
    //     <div key={index} className="post">
    //       <div className="post-header">
    //         <div className="post-header-info">
    //           <div className="post-header-info-name">
    //             {post.from.name}
    //           </div>
    //           <div className="post-header-info-email">
    //             {post.from.email}
    //           </div>
    //         </div>
    //         <div className="post-header-date">
    //           {post.dateTimeCreated}
    //         </div>
    //       </div>
    //       <div className="post-body">
    //         {post.fullText}
    //       </div>
    //     </div>
    //   );
    });
  }

  renderPosts(0,5)