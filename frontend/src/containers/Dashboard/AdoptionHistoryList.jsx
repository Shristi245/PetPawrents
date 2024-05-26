import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { useDebounce } from "../../utils";
import Swal from "sweetalert2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IconButton } from "@material-tailwind/react";
import { format } from "date-fns";

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

  return (
    <div className="flex overflow-hidden mb-32 h-screen">
      {/* Include AdminSideMenu component */}
      <AdminSideMenu />

      {/* Main Content */}
      <div className="flex-1  px-9 overflow-hidden mt-8">
        {/* <div className="p-4 flex items-center justify-between">
          Search Bar
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
        </div>   */}

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
                      {adoption.user.first_name}
                      {adoption.user.last_name}
                    </td>
                    <td className="px-4 py-2 border">{adoption.user.email}</td>
                    <td className="px-4 py-2 border">
                      {format(adoption.adopted_date, "dd MMM, yyyy")}
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
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
              <div className="modal-overlay absolute w-full h-full bg-gray-500 opacity-75 "></div>
              <div className="h-screen py-7 z-50 overflow-y-auto w-[50%] bg-white">
                <div className="text-right ">
                  <button
                    className="text-2xl border border-black bg-red-400 mr-3 px-2 text-white"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </button>
                </div>

                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title text-4xl text-center font-bold underline text-gray-900">
                      Legal Adoption Agreement
                    </h3>
                  </div>
                  <div className="modal-body px-3 mt-7">
                    {/* Render AdoptionAgreementForm component with fetched agreement data */}
                    {selectedAgreementForm.map((agreement) => (
                      <>
                        <p className="mb-2"></p>

                        <div className="text-left text-black mt-5 bg-blue px-3 rounded-lg py-3">
                          <div className="mb-4 text-lg flex space-x-2">
                            <p className="text-white">
                              Mr/Mrs. {agreement.adopter_name}
                            </p>
                            <p>agreed to the following terms and conditions:</p>
                          </div>
                          <p className="mb-4">
                            1. I agree to adopt the mentioned pet from Pet
                            Pawrents.
                          </p>
                          <p className="mb-4">
                            2. I understand that this adoption is a lifelong
                            commitment, and I agree to provide proper care,
                            attention, and love to the pet.
                          </p>
                          <p className="mb-4">
                            3. I agree to provide a safe and suitable
                            environment for the pet to live in.
                          </p>
                          <p className="mb-4">
                            4. I agree to provide proper veterinary care,
                            including vaccinations, deworming, and annual
                            check-ups.
                          </p>
                          <p className="mb-4">
                            5. I understand that I am responsible for all costs
                            associated with the pet's care, including but not
                            limited to food, grooming, and medical expenses.
                          </p>
                          <p className="mb-4">
                            6. I agree to license the pet in accordance with
                            local laws and regulations.
                          </p>
                          <p className="mb-4">
                            7. I understand that if, for any reason, I am unable
                            to keep the pet, I will return it to Pet Pawrents
                            and not abandon it or surrender it to a third party.
                          </p>
                          <p className="mb-4">
                            8. I agree to allow Pet Pawrents to conduct periodic
                            check-ins to ensure the pet's well-being.
                          </p>
                        </div>

                        {/* Replace with agreement details */}
                        <div className="text-left ml-5 mt-5 text-xl ">
                          <p>
                            <strong>Animal ID:</strong> {agreement.adopt.id}
                          </p>
                          <p>
                            <strong>Animal Name:</strong> {agreement.adopt.name}
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
                          <div className="mb-4 mt-1 text-lg  justify-between">
                            <p className="font-semibold text-right">
                              Date:
                              {format(agreement.agreement_date, "dd MMM, yyyy")}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
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
