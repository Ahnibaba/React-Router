import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";
import DataContext from "./context/DataContext";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const {
    posts,
    setPosts,
    setTitleAlert,
    titleAlert,
    visibility,
    setVisibility,
  } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    setVisibility(true);
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody, setVisibility]);


  const handleEdit = async (id) => {
    const datePack = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id: id,
      title: editTitle,
      datetime: datePack,
      body: editBody,
    };

    try {
      if (editTitle === null || editTitle === "") {
        // If editTitle is null or empty, update a specific state
        setTitleAlert(true);
        setTimeout(() => {
          setTitleAlert(false);
        }, 2000);
      } else {
        // If editTitle is not null or empty, proceed with the API call
        const response = await api.put(`/post/${id}`, updatedPost);
        setPosts(
          posts.map((post) => (post.id === id ? { ...response.data } : post))
        );
        setEditTitle("");
        setEditBody("");
        navigate("/");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };


  return (
    <main className="NewPost">
      {visibility && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            {titleAlert && (
              <p style={{ color: "red" }}>Add a title to your Post</p>
            )}
            <label htmlFor="postTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              //It does not need a type text because it is already a text area
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default EditPost;
