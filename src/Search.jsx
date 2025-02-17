import { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./index.css";
function Search() {
  const webcamRef = useRef(null);
  let [name, setName] = useState("");

  const submitSearch = async () => {
    const ss = webcamRef.current.getScreenshot();
    if (!ss) {
      alert("Please capture an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", dataURItoBlob(ss));

    try {
      const response = await fetch("http://localhost:5001/search", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        const names = data.matches.map((match) => match.name);
        setName(names[0]);
      } else {
        setName("!No matches found!");
      }
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

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
        <button
          className=" text-[#adb5bd] p-2 rounded-lg shadow-xl border-solid border-2 border-transparent bg-[#212529] active:bg-[#adb5bd] hover:border-gray-500 "
          onClick={submitSearch}
        >
          Search
        </button>
      </div>
      <div className="w-96 h-20 bg-[#e9ecef] text-4xl text-center p-3 italic ">
        {name}
      </div>
    </div>
  );
}

export default Search;
