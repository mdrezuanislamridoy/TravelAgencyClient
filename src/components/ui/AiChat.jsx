import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AiChat() {
  return (
    <div title="Chat with AI">
      <div className="z-20 fixed bottom-4 right-2">
        <FontAwesomeIcon
          icon={faRobot}
          className="cursor-pointer text-2xl text-white w-8 h-8 extra-bg-color py-3 px-2 rounded-full"
        />
      </div>
    </div>
  );
}
