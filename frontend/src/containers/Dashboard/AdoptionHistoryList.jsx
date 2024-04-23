import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { useDebounce } from "../../utils";
import Swal from "sweetalert2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IconButton } from "@material-tailwind/react";

const AdminAdoptionHistory = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedAgreementForm, setSelectedAgreementForm] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const debouncedSearchText = useDebounce(searchText);

  const fetchAdoptionHistory = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/adoption-history/all/`
      );

      setFilteredUsers(response.data);
      setAdoptions(response.data);
    } catch (error) {
      console.error("Error fetching adopted history:", error);
    }
  };

  useEffect(() => {
    fetchAdoptionHistory();
  }, []);

  const updateAdoptionHistoryStatus = (id) => async () => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://127.0.0.1:8000/adoption-history/update-status/${id}/`,
          {
            method: "PATCH",
          }
        );

        if (!res.ok) {
          Swal.fire({
            title: "Error!",
            text: "Unable to change the status at the momebt",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          title: "Success!",
          text: "Status changed successfully",
          icon: "success",
        });

        fetchAdoptionHistory();
      }
    });
  };
  const handleAgreementDetails = async (adoptID) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/agreement-forms/${adoptID}/`
      );
      const agreementForm = response.data;
      setShowModal(true);
      setSelectedAgreementForm(agreementForm);
    } catch (error) {
      console.error("Error fetching agreement details:", error);
    }
  };
  //   useEffect(() => {
  //     const _searchText = debouncedSearchText.toLowerCase();
  //     const _filteredUsers = adoptions.filter(
  //       ({ user, pet_type, service, status }) => {
  //         const { email, phone, full_name } = user;
  //         return (
  //           email.toLowerCase().includes(_searchText) ||
  //           phone.toLowerCase().includes(_searchText) ||
  //           full_name.toLowerCase().includes(_searchText) ||
  //           pet_type.toLowerCase().includes(_searchText) ||
  //           service.toLowerCase().includes(_searchText) ||
  //           status.toLowerCase().includes(_searchText)
  //         );
  //       }
  //     );
  // setFilteredUsers(_filteredUsers);
  //   }, [debouncedSearchText, appointments]);

  return (
    <div className="flex overflow-hidden mb-32 h-screen">
      {/* Include AdminSideMenu component */}
      <AdminSideMenu />

      {/* Main Content */}
      <div className="flex-1  px-9 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative  ">
            <input
              type="text"
              className=" text-black text-xl px-3 py-1 rounded-full focus:outline-none"
              placeholder="Type to search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="absolute right-0 top-0 mt-1 mr-2">
              <svg
                className="h-6 w-6 text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.71 18.29l-5.47-5.47A5.93 5.93 0 0 0 14 10c0-3.31-2.69-6-6-6S2 6.69 2 10s2.69 6 6 6c1.3 0 2.49-.41 3.47-1.11l5.47 5.47c.39.39 1.02.39 1.41 0 .38-.39.39-1.02 0-1.41zM4 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main content starts here */}
        <h1 className="text-4xl ml-3">Adoption History</h1>
        <div className="overflow-hidden w-full py-5">
          <div className=" text-xl w-full  overflow-y-scroll">
            <table className="w-full  border border-collapse  overflow-y-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">Animal ID</th>
                  <th className="px-4 py-2 border">Animal Name</th>
                  <th className="px-4 py-2 border">User</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Adopted Date</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Agreement</th>
                </tr>
              </thead>
              <tbody className="text-center text-[#673405]">
                {filteredUsers.map((adoption, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{adoption.adopt.id}</td>

                    <td className="px-4 py-2 border">{adoption.adopt.name}</td>
                    <td className="px-4 py-2 border">
                      {adoption.user.last_name}
                      {adoption.user.last_name}
                    </td>
                    <td className="px-4 py-2 border">{adoption.user.email}</td>
                    <td className="px-4 py-2 border">
                      {adoption.adopted_date}
                    </td> 
                    <td className="px-4 py-2 border">{adoption.status}</td>
                    <td>
                      <div className="flex gap-x-2 pl-2">
                        <IconButton
                          onClick={updateAdoptionHistoryStatus(adoption.id)}
                          disabled={adoption.status === "adopted"}
                          variant="text"
                          size="sm"
                        >
                          <IoMdCheckmarkCircleOutline color="green" size={20} />
                        </IconButton>
                        {/* <RxCrossCircled color="red" /> */}
                      </div>
                    </td>
                    <td className="px-4 py-2 border ">
                      <button
                        className="text-black font-bold py-2 px-4 rounded"
                        onClick={() =>
                          handleAgreementDetails(adoption.adopt.id)
                        }
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Legal Adoption Agreement
                        </h3>
                        <div className="mt-4">
                          {selectedAgreementForm.map((agreement, index) => (
                            <React.Fragment key={index}>
                              <p className="mb-2">
                                This Adoption Agreement is entered into on{" "}
                                {agreement.agreement_date}, by and between:
                              </p>
                              <p className="mb-2">
                                Party of the Second Part:{" "}
                                {agreement.adopter_name}
                              </p>
                              <p className="mb-4">
                                Both parties agree to the following terms and
                                conditions:
                              </p>
                              {/* Replace with agreement details */}
                              <div>
                                <p>
                                  <strong>User ID:</strong> {agreement.user.id}
                                </p>
                                <p>
                                  <strong>Animal ID:</strong>{" "}
                                  {agreement.adopt.id}
                                </p>
                                <p>
                                  <strong>Animal Name:</strong>{" "}
                                  {agreement.adopt.name}
                                </p>
                                <p>
                                  <strong>Adopter Name:</strong>{" "}
                                  {agreement.adopter_name}
                                </p>
                                <p>
                                  <strong>Contact:</strong>{" "}
                                  {agreement.contact_information}
                                </p>
                                <p>
                                  <strong>Permanent Address:</strong>{" "}
                                  {agreement.permanent_address}
                                </p>
                                <p>
                                  <strong>Temporary Address:</strong>{" "}
                                  {agreement.temporary_address}
                                </p>
                                {/* Add more fields as needed */}
                              </div>
                              {/* Signature Section */}
                              <div className="mb-4">
                                <p className="mb-1">
                                  Signature: ___________________________________
                                </p>
                                <p>Date: _____________________________</p>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={() => setShowModal(false)}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAdoptionHistory;
