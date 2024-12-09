import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RightFeed from './RightFeed'
import LeftFeed from './LeftFeed'
import MainFeed from './MainFeed'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [currentUser, setCurrentUser] = useState(null);

  const [sampleUsers, setSampleUsers] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6789/api/sampleusers/')
    .then(response => response.json())
    .then(data => setSampleUsers([...data]))
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:6789/api/posts/')
    .then(response => response.json())
    .then(data => setPosts([...data]))
    .catch(error => console.error(error));
  }, [currentUser]);

  return (
    <>
      <div>

      <div className='grid grid-cols-12 h-screen w-screen'>
        <div className='flex bg-black h-screen flex-col col-span-3'>
          <LeftFeed currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
        <div className='flex bg-black h-screen flex-col col-span-5'>
          <MainFeed currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>
        </div>
        <div className='flex bg-black h-screen flex-col col-span-4'>
          <RightFeed sampleUsers={sampleUsers} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
