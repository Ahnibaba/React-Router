import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import api from "./api/posts";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/post/${id}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(`Error: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/post/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="PostPage">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <article className="post">
          {post ? (
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/edit/${post.id}`}>
                <button className="editButton">Edit Post</button>
              </Link>
              <button
                className="deleteButton"
                onClick={() => handleDelete(post.id)}
              >
                Delete Post
              </button>
            </>
          ) : (
            <>
              <h2>Post Not Found</h2>
              <p>Well, that is disappointing.</p>
              <p>
                <Link to="/">Visit Our Homepage</Link>
              </p>
            </>
          )}
        </article>
      )}
    </main>
  );
};

export default PostPage;
