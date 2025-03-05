import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function MessageButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        title="Message"
        type="button"
        className="inline-flex items-center p-2 md:p-6 md:rounded-full w-10 h-10 justify-center text-2xl text-gray-50 md:text-white rounded-lg md:fixed md:bottom-20 md:right-3 md:z-30  md:bg-blue-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => navigate("/messages")}
      >
        <FontAwesomeIcon icon={faMessage} />
      </button>
    </div>
  );
}
