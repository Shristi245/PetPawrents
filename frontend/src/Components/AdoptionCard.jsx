import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";
import { getLogInDetailsFromLocalStorage } from "../utils";
// import { updloadImageToFirebase } from "../../utils";
import { format } from "date-fns";
import { toast } from "react-toastify";

const AdoptionCard = ({ image, id, name, description, fetchAdoptions }) => {
  const user = getLogInDetailsFromLocalStorage();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adoptionDate, setAdoptionDate] = useState("");
  const [showAgreementModal, setShowAgreementModal] = useState(false); // State to control the visibility of the agreement modal
  const location = useLocation();

  const defaultAgreementInfo = {
    adopter_name: "",
    contact_information: "",
    permanent_address: "",
    temporary_address: "",
    agreement_date: "",
  };

  const agreement_date = new Date();

  const [agreementInfo, setAgreementInfo] = useState(defaultAgreementInfo);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use checked value if input type is checkbox, otherwise use the regular value
    const newValue = type === "checkbox" ? checked : value;

    setAgreementInfo((prevInfo) => ({ ...prevInfo, [name]: newValue }));
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const storeAgreementDetails = async (petID) => {
    try {
      const isUserAcceptedTermsAndCondition =
        document.getElementById("termsAndConditions").checked;

      if (!isUserAcceptedTermsAndCondition) {
        Swal.fire({
          title: "Error",
          text: "Please accept the Terms and Conditions",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        const { value: date } = await Swal.fire({
          title: "Enter Adoption Date",
          input: "date",
          inputLabel: "Adoption Date",
          inputPlaceholder: "Select a date",
          showCancelButton: true,
          confirmButtonText: "Adopt",
          cancelButtonText: "Cancel",
          preConfirm: (date) => {
            setAdoptionDate(date);
            return date;
          },
        });
        if (date) {
          const currentDate = new Date();
          const selectedDate = new Date(date);

          if (currentDate >= selectedDate) {
            Swal.fire({
              icon: "error",
              text: "Date Cannot Be in Past",
              title: "Error",
            });
            return;
          }

          const result = await Swal.fire({
            title: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, adopt it",
          });
          if (result.isConfirmed) {
            const agreementRes = await storeAgreementDetailsInDB(petID);

            if (!agreementRes.ok) {
              Swal.fire({
                title: "Error",
                text: "Failed to store agreement details",
                icon: "error",
              });

              return;
            }

            const agreementResData = await agreementRes.json();

            await submitAdoptionDetails(petID, agreementResData.id);

            Swal.fire({
              title: "Success!",
              text: "Please pick up your pet within the mentioned time",
              icon: "success",
            });
            
            setAdoptionDate("");
            fetchAdoptions();
            setShowAgreementModal(false); // Close the modal after successful adoption
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }

      // handleAdoptionSubmit(agreementResData.id);
    } catch (error) {
      console.error("Error fetching agreement data:", error.message);
    }
  };

  const storeAgreementDetailsInDB = async (petID) => {
    const agreementRes = await fetch("http://127.0.0.1:8000/agreement-forms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adopter_name: agreementInfo.adopter_name,
        contact_information: agreementInfo.contact_information,
        permanent_address: agreementInfo.permanent_address,
        temporary_address: agreementInfo.temporary_address,
        agreement_date: agreement_date,
        user: user.id,
        adopt: petID,
      }),
    });

    return agreementRes;
  };

  const submitAdoptionDetails = async (adoptionID, aggreementID) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user-adopted-pets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adopted_date: adoptionDate,
          user: user.id,
          adopt: adoptionID,
          aggreement: aggreementID,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to adopt pet");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to adopt pet: " + error.message);
    }
  };

  // Function to handle delete action
  const handleDelete = async () => {
    // Display confirmation modal
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms deletion, proceed with delete operation
    if (result.isConfirmed) {
      setLoading(true);
      try {
        // Make an API call to delete the product with the given ID
        const response = await fetch(
          `http://127.0.0.1:8000/adoption/${id}/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Include any authentication headers if required
            },
          }
        );

        if (response.ok) {
          fetchAdoptions();
          console.log(`Animal detail deleted successfully`);
          // Optionally, you can perform additional actions such as updating the UI
        } else {
          console.error("Failed to delete animal detail:", response.statusText);
          // Handle error scenario, show error message or perform any other actions
        }
      } catch (error) {
        console.error("Error deleting animal detail:", error);
        // Handle error scenario, show error message or perform any other actions
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[270px] h-[390px] px-3 py-2 text-center">
      <img
        src={image}
        alt={name}
        className="service-image border hover:shadow-xl rounded-[32px] w-full h-[250px] object-cover"
      />
      <h3
        className="text-lg font-semibold mt-4"
        style={{ fontFamily: "poppins" }}
      >
        {name}
      </h3>
      <p className="mt-2">
        {showFullDescription ? description : `${description.slice(0, 100)}...`}
      </p>
      <button
        className="text-blue-500 hover:underline"
        onClick={toggleDescription}
      >
        {showFullDescription ? "Read Less" : "Read More"}
      </button>

      {location.pathname === "/admin-dashboard-adoption" ? (
        <div className="space-x-5 flex">
          <Link to={`/edit-adoption/${id}`}>
            <FiEdit className="text-blue-500 cursor-pointer" size={24} />
          </Link>
          <FiTrash2
            className={`text-red-500 cursor-pointer ${
              loading ? "opacity-50" : ""
            }`}
            size={24}
            onClick={handleDelete}
            disabled={loading}
          />
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full"
          onClick={() => setShowAgreementModal(true)}
        >
          Adopt
        </button>
      )}

      {/* Agreement modal */}
      {showAgreementModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-500 opacity-75 "></div>
          <div className="h-screen py-7 z-50 overflow-y-auto w-[50%] bg-white">
            <div className="text-right ">
              <button
                className="text-2xl border border-black bg-red-400 mr-3 px-2 text-white"
                onClick={() => setShowAgreementModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title text-4xl  font-bold underline text-gray-900">
                  Legal Adoption Agreement
                </h3>
              </div>
              <div className="modal-body px-3 mt-7">
                {/* Render AdoptionAgreementForm component with fetched agreement data */}

                <>
                  <p className="mb-2">
                    Mr/Mrs.
                    <input
                      className="ml-5 border border-black"
                      placeholder="Enter Full Name"
                      id="adopter_name"
                      name="adopter_name"
                      onChange={handleChange}
                      value={agreementInfo.adopter_name}
                      required
                    ></input>
                  </p>

                  <div className="text-left text-white mt-5 bg-blue px-3 rounded-lg py-3">
                    <p className="mb-4 text-lg">
                      <input type="checkbox" id="termsAndConditions" />
                      <label htmlFor="termsAndConditions" className="ml-2">
                        I agree to the following terms and conditions:
                      </label>
                    </p>
                    <p className="mb-4">
                      1. I agree to adopt the above-mentioned pet from Pet
                      Pawrents.
                    </p>
                    <p className="mb-4">
                      2. I understand that this adoption is a lifelong
                      commitment, and I agree to provide proper care, attention,
                      and love to the pet.
                    </p>
                    <p className="mb-4">
                      3. I agree to provide a safe and suitable environment for
                      the pet to live in.
                    </p>
                    <p className="mb-4">
                      4. I agree to provide proper veterinary care, including
                      vaccinations, deworming, and annual check-ups.
                    </p>
                    <p className="mb-4">
                      5. I understand that I am responsible for all costs
                      associated with the pet's care, including but not limited
                      to food, grooming, and medical expenses.
                    </p>
                    <p className="mb-4">
                      6. I agree to license the pet in accordance with local
                      laws and regulations.
                    </p>
                    <p className="mb-4">
                      7. I understand that if, for any reason, I am unable to
                      keep the pet, I will return it to Pet Pawrents and not
                      abandon it or surrender it to a third party.
                    </p>
                    <p className="mb-4">
                      8. I agree to allow Pet Pawrents to conduct periodic
                      check-ins to ensure the pet's well-being.
                    </p>
                  </div>

                  {/* Replace with agreement details */}
                  <div className="text-left ml-5 mt-5">
                    <p className="text-lg">
                      {" "}
                      Enter the following details for adoption process:
                    </p>
                    <p className="mt-3">
                      <strong>Contact:</strong>
                      <input
                        className="ml-5 border border-black rounded"
                        placeholder="Enter your contact info "
                        type="tel"
                        id="contact_information"
                        name="contact_information"
                        onChange={handleChange}
                        required
                        value={agreementInfo.contact_information}
                      ></input>
                    </p>
                    <p className="mt-3">
                      <strong>Permanent Address:</strong>
                      <input
                        className="ml-5 border border-black rounded"
                        id="permanent_address"
                        name="permanent_address"
                        onChange={handleChange}
                        value={agreementInfo.permanent_address}
                        required
                      ></input>
                    </p>
                    <p className="mt-3">
                      <strong>Temporary Address:</strong>{" "}
                      <input
                        className="ml-5 border border-black rounded"
                        type="text"
                        id="temporary_address"
                        name="temporary_address"
                        onChange={handleChange}
                        value={agreementInfo.temporary_address}
                      ></input>
                    </p>
                    {/* Add more fields as needed */}
                  </div>
                  <div className="mb-4 mt-20  text-lg ml-4 justify-between">
                    <p className="font-semibold text-left">
                      Date: {format(agreement_date, "dd MMM, yyyy")}
                    </p>
                  </div>
                </>
              </div>
              <div className="modal-footer">
                <button
                  className="bg-blue text-white px-4 py-2 rounded-md mt-2 w-[20%]"
                  // onClick={() => handleAdoptionSubmit(id)}
                  onClick={() => storeAgreementDetails(id)}
                >
                  Submit Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionCard;
