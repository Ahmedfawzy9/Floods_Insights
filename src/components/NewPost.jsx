import React, { useState } from 'react';

const NewPost = ({ onPostSubmit }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = () => {
    onPostSubmit(postText);
    setPostText(''); 
  };

  return (
    <section className="new-post">
      <h2>Create a Post</h2>
      <textarea
        id="postText"
        placeholder="Share something about floods..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      ></textarea>
      <button 
        id="postBtn" 
        className="post-btn"
        onClick={handleSubmit} 
      >
        Post
      </button>
    </section>
  );
};

export default NewPost;