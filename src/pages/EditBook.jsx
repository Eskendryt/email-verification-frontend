import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/home/backButton";
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
const token = localStorage.getItem("token");
  useEffect(()=>{
    
axios
  .get(`http://localhost:5001/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    setAuthor(response.data.author);
    setPublishYear(response.data.publishYear);
    setTitle(response.data.title);
  })
  .catch((error) => {
    alert(`An eror happened .Please Check Console.`);
    console.log(error);
  });
  },[]);

   const handleSaveBook = () => {
     const data = {
       title,
       author,
       publishYear,
     };
     
     axios
       .put(`http://localhost:5001/books/${id}`, data, {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       })
       .then(() => {
         navigate("/home");
       })
       .catch((error) => {
         console.error(error);
       });
   };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Create Book</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mx-4 px4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-3">Author :</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mx-4 px4 py-2"
          />
        </div>
        <div className="my-4">
          <label>Publish Year :</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="mx-3 px4 py-2"
          />
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
