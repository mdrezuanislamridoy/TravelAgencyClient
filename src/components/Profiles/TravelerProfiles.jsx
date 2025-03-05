import { Link } from "react-router-dom";

export default function TravelerProfiles() {
  return (
    <div>
      <div className="bg-color m-4 p-4 rounded-lg">
        <div>
          <ul className="flex gap-2">
            <li className="border-r-2 pr-2">
              <Link>Travels</Link>
            </li>
            <li className="border-r-2 pr-2">
              <Link>Bookings</Link>
            </li>
            <li>
              <Link>Reviews</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
