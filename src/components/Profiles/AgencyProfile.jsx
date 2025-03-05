import { useContext, useState } from "react";
import Bookings from "./Features/Agency/Bookings";
import GetMyTrips from "./Features/Agency/GetMyTrips";
import CompletedTrips from "./Features/Agency/CompletedTrips";
import AddTrip from "./Features/Agency/AddTrip";
import { context } from "../../context/UserContext";

export default function AgencyProfile() {
  const { user } = useContext(context);
  const [activeTab, setActiveTab] = useState("My Trips");
  const agencyId = user._id;

  const tabs = [
    { label: "My Trips", content: <GetMyTrips agencyId={agencyId} /> },
    { label: "Bookings", content: <Bookings agencyId={agencyId} /> },
    {
      label: "Completed Trips",
      content: <CompletedTrips agencyId={agencyId} />,
    },
    { label: "Add Trip", content: <AddTrip agencyId={agencyId} /> },
  ];

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <ul className="flex space-x-4">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`px-4 py-2 rounded-md cursor-pointer transition ${
                activeTab === tab.label
                  ? "bg-blue-500 text-white font-semibold shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.label === activeTab).content}
      </div>
    </div>
  );
}
