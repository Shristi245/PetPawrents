// AdoptionHistoryPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLogInDetailsFromLocalStorage } from "../../utils";
const AdoptionHistoryPage = () => {
  const [adoptionRecords, setAdoptionRecords] = useState([]);
  const user = getLogInDetailsFromLocalStorage();
  useEffect(() => {
    // Fetch adoption records from backend API
    const fetchAdoptionRecords = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/adoption/user/${user.id}}`
        ); // Assuming your backend API endpoint for adoption records
        setAdoptionRecords(response.data);
      } catch (error) {
        console.error("Error fetching adoption records:", error);
      }
    };

    fetchAdoptionRecords();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Adoption History</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Animal ID</th>
            <th className="border border-gray-400 px-4 py-2">Animal Name</th>
            <th className="border border-gray-400 px-4 py-2">User</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Adopted Date</th>
          </tr>
        </thead>
        <tbody>
          {adoptionRecords.map((record) => (
            <tr key={record.id}>
              <td className="border border-gray-400 px-4 py-2">
                {record.adopt.id}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {record.adopt.name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {record.user.first_name}
                {record.user.last_name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {record.user.email}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {record.adoptedDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionHistoryPage;
