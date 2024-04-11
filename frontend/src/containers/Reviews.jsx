import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { Rating } from "@material-tailwind/react";
import { format } from "date-fns";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const ReviewType = [
    { id: 1, name: "Grooming" },
    { id: 2, name: "Vaccination" },
    { id: 3, name: "Products" },
    { id: 4, name: "Veterinary" },
    { id: 4, name: "Donation" },
    { id: 4, name: "Adoption" },
  ];

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

  return (
    <div className="container mx-auto mt-11 mb-9">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div>
          <h1 className="text-3xl font-bold mb-4">Leave a Review</h1>
          <div className="flex items-center mb-4">
            <p className="mr-2">Your Rating:</p>
            <Rating value={rating} onChange={(value) => setRating(value)} />
          </div>

          <select
            className="w-full border rounded p-2 mb-4"
            rows="4"
            placeholder="Review Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Service Type</option>
            {ReviewType.map((ReviewType) => (
              <option key={ReviewType.id} value={ReviewType.name}>
                {ReviewType.name}
              </option>
            ))}
          </select>

          <textarea
            className="w-full border rounded p-2 mb-4"
            rows="4"
            placeholder="Write your review here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button
            className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
        <div>
          <div className=" mb-9 ">
            <h2 className="text-3xl font-bold mb-4">Recent Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {reviews.map((review) => (
                <div key={review.id} className="bg-slate-300 p-4 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-90">
                  <p className="font-bold text-xl">Service Type: {review.type}</p>
                  <p>
                    <Rating value={review.star} readonly />
                  </p>
                  <p className="text-lg">{review.content}</p>
                  <p className="text-[13px] text-end">
                    {format(new Date(review.created_at), "dd/MM/yyyy")}
                  </p>
                  {/* Add delete and update buttons here if needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
