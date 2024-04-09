import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { Rating } from "@material-tailwind/react";
import { format } from "date-fns";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/reviews/");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const user = getLogInDetailsFromLocalStorage();
  const handleSubmit = async () => {
    console.log({
      user: user.id,
      type,
      content,
      star: rating,
    });
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reviews/create/",
        {
          user: user.id,
          type,
          content,
          star: rating,
        }
      );
      console.log("Review submitted successfully:", response.data);
      // Refresh reviews after submission
      fetchReviews();
      // Clear input fields
      setRating(0);
      setContent("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://127.0.0.1:8000/reviews/delete/${id}`
  //     );
  //     console.log("Review deleted successfully:", response.data);
  //     // Refresh reviews after deletion
  //     fetchReviews();
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //   }
  // };

  // const handleUpdate = async (id, newData) => {
  //   try {
  //     const response = await axios.put(
  //       `http://127.0.0.1:8000/reviews/update/${id}`,
  //       newData
  //     );
  //     console.log("Review updated successfully:", response.data);
  //     // Refresh reviews after update
  //     fetchReviews();
  //   } catch (error) {
  //     console.error("Error updating review:", error);
  //   }
  // };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Leave a Review</h1>
      <div className="flex items-center mb-4">
        <p className="mr-2">Your Rating:</p>
        <Rating value={rating} onChange={(value) => setRating(value)} />
      </div>

      <input
        className="w-full border rounded p-2 mb-4"
        rows="4"
        placeholder="Review Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      ></input>

      <textarea
        className="w-full border rounded p-2 mb-4"
        rows="4"
        placeholder="Write your review here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Review
      </button>

      <div className="mt-8 mb-9">
        <h2 className="text-3xl font-bold mb-4">Recent Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-slate-300 p-4 rounded-md">
              <p className="font-bold text-xl">Type: {review.type}</p>
              <p>
                <Rating value={review.star} readonly />
              </p>
              <p className="text-lg">{review.content}</p>
              <p className="text-[13px] text-end">{format(new Date(review.created_at), "dd/MM/yyyy")}</p>
              {/* Add delete and update buttons here if needed */}
            </div>
          ))}
        </div>

        {/* <button
              className="bg-red-500 text-black py-1 px-2 rounded hover:bg-red-600"
              onClick={() => handleDelete(review.id)}
            >. 
              Delete
            </button>
            <button
              className="bg-green-500 text-black py-1 px-2 rounded hover:bg-green-600"
              onClick={() =>
                handleUpdate(review.id, {
                  rating: 5,
                  content: "Updated review content",
                })
              }
            >
              Update
            </button> */}
      </div>
    </div>
  );
};

export default ReviewPage;
