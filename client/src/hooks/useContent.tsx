import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

function useContent() {
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setContents(response.data.content);
      });
  }, []);
  return [contents, setContents] as const;
}

export default useContent;
