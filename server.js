const express = require('express');

const app = express(); 
const PORT = 6789; 

const cors = require('cors');


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => { 
  res.send('Server is up and running!');
});

app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`);
});

let users = [
 { id: 1, username: "billgates", password: "billgates", userbio: "Founder of Microsoft", displayName: "Bill Gates", userBackground: "https://pbs.twimg.com/profile_banners/50393960/1672784571/1500x500", profilePic: "https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg", userfollowers: [], userfollowing: [], userliked: [], userretweeted: [], usersaved: [], userposts: [1,], userreplied:[], userthreads: [], usernotifications: []},
 { id: 2, username: "jokerhut", password: "jokerhut", userbio: "Founder of Microsoft", displayName: "David", userBackground: "https://media.istockphoto.com/id/1135314826/video/synthwave-net-and-stars-retro-background-3d-render.jpg?s=640x640&k=20&c=x3TIAoLhK0QUlEI8XxB4LqfeBs7vU3xXXIWrIVWjQAo=", profilePic: "https://cdn.prod.website-files.com/62bdc93e9cccfb43e155104c/654e8c568fee71420a5134b5_63ca2aa7780fcd20bb04563c_Cool%2520Snoopy%2520PFP%2520for%2520Tiktok%25201.jpeg", userfollowers: [], userfollowing: [], userliked: [], userretweeted: [], usersaved: [], userposts: [1,], userreplied:[], userthreads: [], usernotifications: []}
];

let sampleUsers = [
    { id: 1, username: "billgates", password: "billgates", userbio: "Founder of Microsoft", displayName: "Bill Gates", userBackground: "https://pbs.twimg.com/profile_banners/50393960/1672784571/1500x500", profilePic: "https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg", userfollowers: [], userfollowing: [], userliked: [], userretweeted: [], usersaved: [], userposts: [1,], userreplied:[], userthreads: [], usernotifications: []},
    { id: 2, username: "jokerhut", password: "jokerhut", userbio: "Founder of Microsoft", displayName: "David G", userBackground: "https://media.istockphoto.com/id/1135314826/video/synthwave-net-and-stars-retro-background-3d-render.jpg?s=640x640&k=20&c=x3TIAoLhK0QUlEI8XxB4LqfeBs7vU3xXXIWrIVWjQAo=", profilePic: "https://cdn.prod.website-files.com/62bdc93e9cccfb43e155104c/654e8c568fee71420a5134b5_63ca2aa7780fcd20bb04563c_Cool%2520Snoopy%2520PFP%2520for%2520Tiktok%25201.jpeg", userfollowers: [], userfollowing: [], userliked: [], userretweeted: [], usersaved: [], userposts: [1,], userreplied:[], userthreads: [], usernotifications: []}
]

let posts = [
  {
    id: 1,
    title: "My First Post!",
    userId: 1,
    likes: [],
    retweets: [],
    saves: [],
    replies: [],
  },
  {
    id: 2,
    title: "Very Cool!",
    userId: 2,
    likes: [],
    retweets: [],
    saves: [],
    replies: [],
  },
]

app.get("/api/sampleusers", (req, res) => {
res.json(sampleUsers);
})

app.get("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log("userId is " + userId);

  const user = users.find(user => user.id === userId);

  console.log("user is: " + JSON.stringify(user));

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({ message: 'User not found' });
  }
})

app.get("/api/users/posts/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log("userId is " + userId);

  const userPosts = posts.filter((post) => post.userId === userId);
  console.log(userPosts);

  if (userPosts) {
    res.status(200).json(userPosts)
  } else {
    res.status(404).json({ message: 'posts not found' });
  }
})

app.get("/api/posts", (req, res) => {
  res.json(posts);
})

app.post("/api/signup", (req, res) => {
  const {username, password, profilePic, displayName, email, userBackground, userBio} = req.body;
  const existingUserCheck = users.find(user => user.username === username && user.password === password)

  if (existingUserCheck) {
    return res.status(400).json({message: "User exists"})
  }
  else {
    const newUser = { 
      id: (users.length + 1), 
      username: username, 
      displayName: displayName, 
      password: password, 
      userBackground: userBackground, 
      userfollowers: [], 
      userfollowing: [], 
      userliked: [], 
      profilePic: profilePic, 
      userRetweeted: [], 
      userSaved: [], 
      userPosts: [], 
      userBio: userBio, 
      userReplied:[], 
      userThreads: [], 
      userNotifications: []
    };

    users.push(newUser);
    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  }
})

app.post("/api/login", (req, res) => {
  const {username, password, email} = req.body;
  const loginCheck = users.find(user => user.username === username && user.password === password)

  if (loginCheck) {
    res.status(201).json({ message: 'User loggin in successfully', user: loginCheck });
  }
  else {
    return res.status(400).json({message: "Incorrect Email or Password"})
  }
})

app.post("/api/newpost", (req, res) => {
  const {userId, postMedia, postTitle} = req.body;

  const postUser = users.find(user => user.id === userId)

  const newPost = 
  {
    id: (posts.length + 1), 
    title: postTitle, 
    media: postMedia, 
    userId: userId, 
    likes: [], 
    replies: [], 
    retweets: [], 
    saves: []
  }

  if (newPost) {
    posts.push(newPost);
    postUser.userposts.push(newPost.id);
    res.status(201).json({ 
      message: 'Post uploaded successfully', 
      newPost: newPost, 
      user: postUser
    });
  }
  else {
    return res.status(400).json({message: "Could not Upload Post"})
  }
})



