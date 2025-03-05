/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";
import axiosInstance from "../../../../utilities/AxiosInstance";

const initialState = {
  tripName: "",
  tripDescription: "",
  tripPrice: "",
  tripLocation: "",
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

export default function AddTrip({ agencyId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const addTrip = async () => {
    if (
      !state.tripName ||
      !state.tripDescription ||
      !state.tripPrice ||
      !state.tripLocation
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axiosInstance.post(
        "/api/tour/addTour",

        {
          agencyId,
          name: state.tripName,
          description: state.tripDescription,
          price: state.tripPrice,
          location: state.tripLocation,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      setError("Failed to add trip. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Add Trip</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-3">
        {[
          { label: "Trip Name", name: "tripName", type: "text" },
          { label: "Trip Description", name: "tripDescription", type: "text" },
          { label: "Trip Price", name: "tripPrice", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block font-medium">
              {label}:
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={state[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder={label}
            />
          </div>
        ))}
        <div>
          <label htmlFor="tripLocation" className="block font-medium">
            Trip Location:
          </label>
          <input
            list="locations"
            className="w-full px-3 py-2 border rounded"
            placeholder="Select a location"
            onChange={handleChange}
            name="tripLocation"
            value={state.tripLocation}
          />
          <datalist id="locations">
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Philadelphia">Philadelphia</option>
            <option value="San Antonio">San Antonio</option>
            <option value="San Diego">San Diego</option>
            <option value="Dallas">Dallas</option>
            <option value="San Jose">San Jose</option>
            <option value="Austin">Austin</option>
            <option value="Jacksonville">Jacksonville</option>
            <option value="Fort Worth">Fort Worth</option>
            <option value="Columbus">Columbus</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Charlotte">Charlotte</option>
          </datalist>
        </div>

        <button
          onClick={addTrip}
          disabled={loading}
          className={`mt-3 px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Adding..." : "Add Trip"}
        </button>
      </div>
    </div>
  );
}
