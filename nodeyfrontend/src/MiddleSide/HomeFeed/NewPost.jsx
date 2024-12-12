import { useState, useEffect } from "react";
import '../../App.css'
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";



function NewPost ({currentUser, setCurrentUser, setPosts}) {

    const [postTitle, setPostTitle] = useState("");
    const [postMedia, setPostMedia] = useState("");



    function handleNewPost (e) {

        e.preventDefault();

        const newPostPayload = {
            postTitle: postTitle,
            userId: currentUser.id,
            postMedia: postMedia,
        };

        fetch('http://localhost:6789/api/newpost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPostPayload),
        })
        .then(response => response.json())
        .then((data) => {
            if (data.message === 'Post uploaded successfully') {
                alert('Post Upload successful!');
                setPosts(prevPosts => [data.newPost, ...prevPosts]);
            } else {
                alert(data.message);
            }
        });
    }

    return(
        <div className=" w-full h-full pt-1">

            <div className="flex flex-row flex-grow  w-full h-full">

                <div className="flex-[1] flex flex-col w-full h-full mr-4 pt-3">
                    {currentUser ? (
                        <img src={currentUser.profilePic} className="rounded-full w-10"/>
                    )
                     : (
                        <img src="/DEFAULTPFP.png" className="rounded-full w-10"/>
                    )}
                </div>

                <div className="flex-[12] flex flex-col w-full h-full">
                    <input placeholder="What is happening?!" onChange={(e) => setPostTitle(e.target.value)} className="text-xl flex-[5] flex py-3 h-6 bg-transparent text-gray-100 border-none focus:outline-none"/>

                    <div className="flex-[12] text-white ">

                        <div className=" flex gap-2 items-center flex-[1] text-sm text-twitterBlue hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer">
                            <FaGlobeAmericas />
                            <p className="font-bold ">Everyone can reply</p>
                        </div>

                        <hr className="mt-3 border-twitterBorder"/>

                        <div className="flex-[3] flex justify-between">
                            <div className="h-1/2 flex gap-4 pt-2 text-twitterBlue items-center">
                                <CiImageOn className="text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                                <MdOutlineGifBox className="text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                                <BsEmojiSmile className="text-l hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                            </div>
                            <div className='h-full w-full text-black flex-[3] flex justify-end items-center py-4'>
                                <div className='h-full w-1/4 bg-white flex justify-center items-center py-1 rounded-l-full rounded-r-full hover:bg-gray-200'
                                onClick={(e) => handleNewPost(e)}
                                >
                                    <p>Post</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewPost;