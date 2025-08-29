import DeleteIcon from "../icons/DeleteIcon";
import DocumentIcon from "../icons/DocumentIcon";
import ShareIcon from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  _id: string;
  onDelete?: (id: string) => void;
}

const Card = ({ title, link, type, _id, onDelete }: CardProps) => {
  async function handleDelete() {
    try {
      if (!onDelete) {
        return;
      }

      onDelete?.(_id);
    } catch (e) {
      console.error(e as Error);
      alert("Couldn't delete this memory.");
    }
  }

  const getYouTubeEmbedUrl = (url: string): string => {
    try {
      const embedUrl = url.replace("watch?v=", "embed/");
      return embedUrl.split("&")[0];
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return url;
    }
  };

  return (
    <div>
      <div className="bg-white rounded-md border-gray-200 border p-4 max-w-72 min-h-48">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-3">
              <DocumentIcon size="4" />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div className="text-red-500 pl-1" onClick={handleDelete}>
              <DeleteIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={getYouTubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
