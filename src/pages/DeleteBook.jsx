import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/home/backButton";
import axios from "axios";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
   
const token = localStorage.getItem("token");

    
    axios
      .delete(`http://localhost:5001/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">
        <div className="d-flex flex-column flex-justify-center border border-danger round-x1 p-5">
          <h5 className="display my-5 text-center">
            Are You Sure You Want to delete this book?
          </h5>
          <button
            className="p-4 btn btn-danger text-white m-8"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </h1>
    </div>
  );
};

export default DeleteBook;
