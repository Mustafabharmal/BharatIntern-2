document.addEventListener('DOMContentLoaded', () => {
    // Initial load: show home page
    showHome();
  });
  
  function showHome() {
    fetch('/posts')
      .then(response => response.json())
      .then(posts => {
        const content = document.getElementById('content');
        content.innerHTML = `
          <h2>Latest Posts</h2>
          <ul>
            ${posts.map(post => `<li><a href="#" onclick="showPost('${post._id}')">${post.title}</a></li>`).join('')}
          </ul>
        `;
      });
  }
  
  function showPost(postId) {
    fetch(`/post/${postId}`)
      .then(response => response.json())
      .then(post => {
        const content = document.getElementById('content');
        content.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        `;
      });
  }
  
  function showNewPostForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <h2>Create a New Post</h2>
      <form onsubmit="createPost(event)">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>
        <label for="content">Content:</label>
        <textarea id="content" name="content" rows="4" required></textarea>
        <button type="submit">Create Post</button>
      </form>
    `;
  }
  
  function createPost(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    fetch('/newpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then(() => showHome());
  }
  