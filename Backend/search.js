const searchHandler = async () => {
  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch("http://localhost:5001/search", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      alert(`Matches found: ${JSON.stringify(data.matches)}`);
    } else {
      alert("No matches found");
    }
  } catch (err) {
    console.error(err);
    alert("Search failed");
  }
};
