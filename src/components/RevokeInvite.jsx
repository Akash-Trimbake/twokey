import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const RevokeInvite = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const revokeInvite = async () => {
    try {
      let token = JSON.parse(secureLocalStorage.getItem("token"));
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/users/deleteUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );

      // console.log(response.status);

      if (response.status === 204) {
        closeDialog();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      <button
        onClick={openDialog}
        className="bg-[#D1293D] text-white text-sm rounded-md py-[5px] px-3"
      >
        × Revoke Invites
      </button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        PaperProps={{
          style: {
            borderRadius: "5px",
          },
        }}
      >
        <DialogTitle>Revoke Invite</DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "#F7F8FA",
          }}
        >
          <div className="my-2 w-[486px] p-3">
            <p className="text-sm">
              Revoking an invite will no longer allow this person to become a
              member of your organization. You can always invite them again if
              you change your mind.
            </p>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "10px" }}>
          <button
            className="px-2 py-1 mx-2 rounded-lg shadow-sm border border-gray-300"
            onClick={closeDialog}
            color="primary"
          >
            Keep Invite
          </button>
          <button
            className="px-2 py-1 rounded-lg shadow-sm bg-[#D1293D] text-white"
            onClick={revokeInvite}
          >
            Revoke Invite
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RevokeInvite;
