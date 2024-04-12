import React, { useState} from "react";
import axios from "axios";
import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";
import TextEditor from "../components/editFiles/TextEditor";

const IPDetector = () => {
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org/?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div>
      <h1>Your IP address: {ipAddress}</h1>
      <pre>{navigator.userAgent}</pre>
      {/* <pre>{navigator.userAgentData.mobile}</pre> */}
      {/* <pre>{navigator.userAgentData.platform}</pre> */}
    </div>
  );
};

export default IPDetector;
