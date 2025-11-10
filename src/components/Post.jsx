import React, { useState } from 'react';

const Post = ({ post, updatePost, isOriginalInfoCard = false }) => {
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // دالة التعامل مع الإعجاب
  const handleLike = () => {
    updatePost(post.id, (prevPost) => ({
      ...prevPost,
      likes: prevPost.likes + 1,
    }), isOriginalInfoCard);
  };

  // دالة إرسال التعليق
  const handleSendComment = () => {
    if (newCommentText.trim() === '') return;

    updatePost(post.id, (prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, newCommentText.trim()],
    }), isOriginalInfoCard);

    setNewCommentText('');
  };
  
  // تحديد الـ className بناءً على نوع المنشور
  const postClass = isOriginalInfoCard ? 'info-card' : 'post-card';
  // لتطبيق ستايل الإعجاب في المنشور التمهيدي (info-card)
  const likeBtnStyle = post.likes > 0 && isOriginalInfoCard ? 
    { backgroundColor: '#0077ff', color: '#fff' } : {};
    
  // لتحديد وسم قائمة التعليقات حسب المنشور الأصلي
  const CommentsListTag = isOriginalInfoCard ? 'ul' : 'div';
  const CommentItemTag = isOriginalInfoCard ? 'li' : 'p';

  return (
    <div className={postClass}>
      <div className="post-header">
        <i className="fa-solid fa-user-circle avatar"></i>
        <div className="post-info">
          <h3>{post.author}</h3>
          <span className="time">{post.time}</span>
        </div>
      </div>
      
      <p className={isOriginalInfoCard ? '' : 'post-text'}>
        {post.text}
      </p>

      <div className="actions">
        <button 
          // زر الإعجاب (يعمل على كلتا الحالتين)
          className={isOriginalInfoCard ? undefined : 'like-btn'}
          onClick={handleLike}
          style={likeBtnStyle} 
        >
          <i className="fa-solid fa-thumbs-up"></i> Like <span className={isOriginalInfoCard ? 'like-count' : 'like-count'}>{post.likes}</span>
        </button>
        
        <button 
          // زر التعليق (يعمل على كلتا الحالتين)
          className={isOriginalInfoCard ? undefined : 'comment-btn'}
          onClick={() => setShowCommentSection(!showCommentSection)}
        >
          <i className="fa-solid fa-comment"></i> Comment
        </button>
        
        <button className="share-btn" onClick={() => alert("✅ Post shared successfully!")}>
          <i className="fa-solid fa-share"></i> Share
        </button>
      </div>

      <div 
        // قسم التعليقات (يظهر أو يختفي)
        className={`${isOriginalInfoCard ? '' : 'comment-section'} ${showCommentSection ? '' : 'hidden'}`}
      >
        <textarea
          // حقل إدخال التعليق
          className={isOriginalInfoCard ? 'userComment' : 'comment-input'}
          placeholder="Write a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        ></textarea>
        <button 
          className="post-btn"
          onClick={handleSendComment}
        >
          Post
        </button>
        
        {/* قائمة التعليقات */}
        <CommentsListTag 
            className={isOriginalInfoCard ? undefined : 'comments-list'}
            id={isOriginalInfoCard ? 'commentsList' : undefined}
        >
          {post.comments.map((comment, index) => (
            <CommentItemTag key={index}>
              {comment}
            </CommentItemTag>
          ))}
        </CommentsListTag>
      </div>
    </div>
  );
};

export default Post;