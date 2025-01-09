const submitHandler = async () => {
  const formData = new FormData();
  formData.append("file", image);
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
