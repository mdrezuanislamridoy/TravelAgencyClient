import { useEffect, useState } from "react";
import axiosInstance from "../../../../utilities/AxiosInstance";
import BookingCard from "../../../cards/BookingCard";

/* eslint-disable react/prop-types */
export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get("/api/tour/getTours", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookings(response.data.tours);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {bookings.map((booking) => (
            <div key={booking._id}>
              <BookingCard booking={booking} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
