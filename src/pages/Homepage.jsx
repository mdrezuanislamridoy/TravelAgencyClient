import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import bgHero from "../assets/bgHero.jpg";
import { context } from "../context/UserContext";
import { useContext } from "react";

// Travel destinations for travelers
const travels = [
  {
    id: 1,
    name: "Serengeti National Park",
    image: "/images/serengeti.jpg",
    price: "$1500",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Victoria Falls",
    image: "/images/victoria-falls.jpg",
    price: "$1200",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Table Mountain",
    image: "/images/table-mountain.jpg",
    price: "$800",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Masai Mara",
    image: "/images/masai-mara.jpg",
    price: "$1400",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Pyramids of Giza",
    image: "/images/giza.jpg",
    price: "$1000",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Bazaruto Archipelago",
    image: "/images/bazaruto.jpg",
    price: "$1600",
    rating: 4.7,
  },
];

// Featured packages for travelers and agencies
const packages = [
  {
    id: 1,
    name: "Maldives Honeymoon Package",
    image: "/images/maldives.jpg",
    price: "$499 / Per Person",
    rating: 5.0,
  },
  {
    id: 2,
    name: "Dubai Desert Safari",
    image: "/images/dubai.jpg",
    price: "$350 / Per Person",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Thailand Beach Escape",
    image: "/images/thailand.jpg",
    price: "$299 / Per Person",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Bali Adventure Trip",
    image: "/images/bali.jpg",
    price: "$399 / Per Person",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Swiss Alps Winter Tour",
    image: "/images/switzerland.jpg",
    price: "$599 / Per Person",
    rating: 5.0,
  },
];

// Features for both traveler and agency
const features = [
  {
    id: 1,
    title: "Best Price Guarantee",
    icon: "fa-dollar-sign",
    description: "আমরা সেরা মূল্যে সর্বোচ্চ মানের পরিষেবা প্রদান করি।",
  },
  {
    id: 2,
    title: "24/7 Customer Support",
    icon: "fa-headset",
    description: "যেকোনো প্রশ্নের জন্য আমাদের সাপোর্ট টিম ২৪/৭ আপনাদের পাশে।",
  },
  {
    id: 3,
    title: "Custom Packages",
    icon: "fa-cogs",
    description: "আপনার চাহিদা অনুযায়ী ব্যক্তিগতকৃত ট্যুর প্যাকেজ তৈরি করুন।",
  },
  {
    id: 4,
    title: "Hassle-free Booking",
    icon: "fa-check-circle",
    description: "সহজ ও দ্রুত বুকিং ব্যবস্থা নিশ্চিত করি।",
  },
];

export default function Homepage() {
  const { user } = useContext(context);
  return (
    <>
      {/************* Hero Section *************/}
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl font-bold">Compare 10,664 Safaris</h1>
          <p className="text-lg mt-2">Offered by Top Rated Tour Operators</p>
          <div className="mt-6 bg-color p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center w-5/6 space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg p-2 flex-grow">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
              <input
                type="text"
                name="search"
                placeholder="Search destinations, tours..."
                className="outline-none text-black w-full"
              />
            </div>
            <button className="cursor-pointer secondary-bg-color w-full my-2 md:w-auto md:my-0  text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center ">
              Search <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/************ Traveler/Agency Content *************/}
      <div className="container mx-auto px-4 py-8">
        {user.role === "traveler" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Popular Destinations for Travelers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {travels.slice(0, 6).map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mt-3">
                    {destination.name}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Price: {destination.price}
                  </p>
                  <p className="text-yellow-500 font-bold">
                    ⭐ {destination.rating}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold">
                View All Destinations
              </button>
            </div>
          </>
        ) : user.role === "agency" ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Featured Packages for Agencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.slice(0, 6).map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-lg shadow-lg p-4">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mt-3">{pkg.name}</h3>
                  <p className="text-gray-500 mt-1">{pkg.price}</p>
                  <p className="text-yellow-500 font-bold">⭐ {pkg.rating}</p>
                  <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-lg font-bold">
            Please log in to view content
          </p>
        )}
      </div>

      {/********* Features ************/}
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-6">কেন আমাদের বেছে নেবেন?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
