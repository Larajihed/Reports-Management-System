import React, { useState } from "react";
import "../style/ReportList.css";
import Popup from "../Components/Popup";
import "reactjs-popup/dist/index.css";
import { Button } from "react-bootstrap";
import { database } from "../firebase";
import { ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function ReportsList(props) {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  /***** Pdf parameters */
  const values = [true];
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  // Conversion props to array , rendering ui through object
  const arr = props.data;

  // returning array from an object maping through arr
  const listItems = Object.keys(arr);
  const auth = getAuth();
  const user = auth.currentUser;
  const localUserId = user.uid;

  function handleClick() {
    //console.log(index)
  }
  function handleDelete(report) {}

  return (
    <>
      <table
        className="position  "
        width="600"
        style={{
          textAlign: "center",
          marginTop: "32px",
          fontSize: "16px",
          border: "none",
          borderRadius: "60px",
        }}
      >
        <thead>
          <th className="font-24" width="1%">
            #
          </th>
          <th className="font-24" width="20%">
            Company
          </th>
          <th className="font-24" width="30%">
            Date
          </th>
          <th className="font-24" width="20%">
            Actions
          </th>
        </thead>
        <tbody>
          {listItems.map((report, index) => (
            <tr>
              {(() => {
                if (arr[report].userId == localUserId) {
                  return (
                    <>
                      <td>
                        <img
                          src="https://www.svgrepo.com/show/103036/pdf.svg"
                          style={{ height: "24px" }}
                        ></img>
                      </td>
                      <td>{arr[report].selectedValue}</td>
                      <td>{arr[report].date}</td>
                      <td>
                        <Popup
                          onClick={(handleClick = () => {})}
                          data={arr[report]}
                        ></Popup>

                        <Button
                          className="btn bg-danger border-0 "
                          onClick={
                            (handleDelete = () => {
                              remove(ref(database, "reports/" + report))
                                .then(() => {})
                                .catch((error) => {});
                              window.location.reload(false);
                            })
                          }
                        >
                          {" "}
                          Delete
                        </Button>
                      </td>
                    </>
                  );
                }
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
