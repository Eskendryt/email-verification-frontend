import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import BackButton from "../components/home/backButton";
import { useSnackbar } from "notistack";
import BackButton from "../components/home/backButton";
const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [image, setImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      image,
    };
    const token = localStorage.getItem("token");

    console.log("token ", token);

    axios
      .post("http://localhost:5001/books", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to create book. Please try again.", {
          variant: "error",
        });
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
            className="mx-4 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-3">Author :</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mx-4 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label>Publish Year :</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="mx-3 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
