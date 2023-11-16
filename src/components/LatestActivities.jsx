import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Checkmark from "../assets/checkmark.svg";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useDarkMode } from "../context/darkModeContext";

const LatestActivities = () => {
  const { darkMode } = useDarkMode();
  const [selectedValue, setSelectedValue] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getCommonLogs = async () => {
      try {
        let token = JSON.parse(sessionStorage.getItem("token"));
        const commonLogs = await axios.get(
          "https://twokeybackend.onrender.com/file/getLogs/access",
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );
        // console.log("commonLogs :", commonLogs.data);
        setLogs(commonLogs.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCommonLogs();
  }, []);

  const formatTimestamp = (timestamp) => {
    const options = {
      timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(timestamp).toLocaleString("en-IN", options);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    console.log("Selected Value:", value);
  };

  return (
    <div className="w-2/5">
      <Paper className="h-72 ">
        <div
          className={`flex justify-between items-center p-4 ${
            darkMode ? "bg-gray-600 text-gray-200" : " "
          }`}
        >
          <span className="flex flex-row items-center gap-1">
            <p className="text-sm font-semibold">Latest Activities</p>
            <select
              className="text-sm text-gray-400"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option value="All">All</option>
              <option value="Requested">Requested</option>
              <option value="Access">Access</option>
            </select>
          </span>
          <span className="flex items-center gap-1 cursor-pointer">
            <p className="text-xs text-gray-500">Mark all as read</p>
            <img src={Checkmark} alt="✔" className="text-sm" />
          </span>
        </div>

        <div className="h-56 overflow-y-scroll scrollbar-hide">
          {logs &&
            logs?.map((log, index) => (
              <div key={index} className="border-b">
                <span className="flex flex-row gap-2 p-2">
                  <Tooltip title={log.user} arrow>
                    <Avatar
                      src={log.profile_pic}
                      alt="owner pic"
                      sx={{ width: 25, height: 25 }}
                    />
                  </Tooltip>
                  <span>
                    <p className="text-sm">
                      <span className="font-semibold">{log.username}</span>{" "}
                      accessed
                      <span className="font-semibold"> {log.file}</span> file.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {formatTimestamp(log.timestamp)}
                    </p>
                  </span>
                </span>
              </div>
            ))}
        </div>
      </Paper>
    </div>
  );
};

export default LatestActivities;
