/* eslint-disable react/prop-types */

export default function BookingCard({ booking }) {
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{booking.name}</h2>
        <p className="text-sm text-gray-500">{booking.date}</p>
        <p className="mt-2 text-gray-700">
          {booking.description.length > 25 ? (
            <div>{booking.description.slice(0, 30)}...</div>
          ) : (
            booking.description
          )}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900">${booking.price}</p>
          <p className="text-sm text-gray-600">{booking.location}</p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 flex justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
          View Detail
        </button>
      </div>
    </div>
  );
}
