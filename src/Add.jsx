import Webcam from "react-webcam";
import { useState, useRef } from "react";

function Add() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  // Capture the webcam image
  const capture = () => {
    const ss = webcamRef.current.getScreenshot();
    setImage(ss);
  };

  // Handle form submission to add a user
  const submitHandler = async () => {
    if (!image || !name) {
      alert("Please capture an image and provide a name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", dataURItoBlob(image)); // Convert base64 image to Blob
    formData.append("name", name);

    try {
      const response = await fetch("http://localhost:5001/add", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert(`User added with ID: ${data.user_id}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  // Convert base64 to blob for upload
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Webcam
        className=""
        audioConstraints={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
      />
      <div className="p-5">
        <input
          className="rounded p-2 mx-1 border-2 border-slate-500 hover:border-black"
          type="text"
          id="name"
          placeholder="Enter Name...."
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className=" p-2 mx-1 text-white  border-black bg-red-600 rounded-full "
          onClick={capture}
        >
          Capture
        </button>
      </div>
      <button
        className=" text-[#adb5bd] p-2 rounded-lg shadow-xl border-solid border-2 border-transparent bg-[#212529] active:bg-[#adb5bd] hover:border-gray-400"
        onClick={submitHandler}
      >
        Submit
      </button>
    </div>
  );
}

export default Add;
