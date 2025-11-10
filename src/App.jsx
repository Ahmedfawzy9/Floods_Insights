import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import NewPost from './components/NewPost.jsx';
import Post from './components/Post.jsx'; // سنستخدمه الآن فقط للمنشور التمهيدي الثابت
import './style.css'; 

// المنشور التمهيدي الثابت (Info Card)
const initialInfoCard = {
  id: 1,
  author: 'Natural Disasters',
  time: 'Just now',
  text: 'Floods are an overflow of water that submerges land that is usually dry. They can occur due to heavy rainfall, river overflow, storm surges, or dam failures. Floods can cause significant damage to property, infrastructure, and can lead to loss of life.',
  likes: 0,
  comments: [],
  isOriginal: true,
};

const App = () => {
  const [infoCardPost, setInfoCardPost] = useState(initialInfoCard);
  const [newPosts, setNewPosts] = useState([]);

  // دالة لإضافة منشور جديد
  const handleNewPost = (postText) => {
    if (postText.trim() === '') {
      alert('Please write something before posting!');
      return;
    }
    const post = {
      id: Date.now(), 
      author: 'Natural Disasters',
      time: 'Just now',
      text: postText,
      likes: 0,
      comments: [],
      isOriginal: false,
    };
    // إضافة المنشور الجديد في بداية القائمة (في الأعلى)
    setNewPosts([post, ...newPosts]);
  };

  // دالة لتحديث الإعجابات/التعليقات
  const updatePost = (postId, updateFn, isOriginal) => {
    if (isOriginal) {
      setInfoCardPost(updateFn(infoCardPost));
    } else {
      setNewPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? updateFn(post) : post
        )
      );
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      
      {/* 🟩 قسم إنشاء بوست جديد */}
      <NewPost onPostSubmit={handleNewPost} />
      
      {/* 🟦 Posts Feed (المنشورات الجديدة تظهر هنا) */}
      <section id="postsFeed">
        {newPosts.map(post => (
          // نستخدم مكون Post لعرض كل منشور جديد
          <Post 
            key={post.id} 
            post={post} 
            updatePost={updatePost}
            isOriginalInfoCard={false} // منشور جديد (post-card)
          />
        ))}
      </section>

      {/* 🏛️ المنشور التمهيدي القديم Info Card - موقعه ثابت في الأسفل */}
      <main className="content">
        <Post 
          key={infoCardPost.id} 
          post={infoCardPost} 
          updatePost={updatePost}
          isOriginalInfoCard={true} // منشور قديم (info-card)
        />
      </main>
    </div>
  );
};

export default App;