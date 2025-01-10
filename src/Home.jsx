import Card from "./Card";
function Home() {
  return (
    <>
      <div className="text-[#212529] scroll-smooth ">
        <div className="relative h-screen flex flex-col justify-center items-center">
          <div className="text-6xl font-bold p-4">Welcome to AuthT!</div>
          <div className="text-4xl ">
            Face Recognition using Machine Learning
          </div>
        </div>
        <div className="h-screen">
          <div className="text-9xl px-20 font-bold">How does it Work?</div>
          <div className="p-20 flex gap-10">
            <Card
              image={"src/assets/card1.jpg"}
              head={"Image is Captured"}
              body={"Image is Captured and sent to backend for processing"}
            />
            <Card
              image={"./src/assets/card2.jpg"}
              head={"Image conversion"}
              body={"Image is converted into Embeddings"}
            />
            <Card
              image={"./src/assets/card3.jpg"}
              head={"Embeddings are stored"}
              body={"Embeddings are stored with user-name "}
            />
            <Card
              image={"./src/assets/card4.jpg"}
              head={"Searching..."}
              body={"these embedding are used for facial recognition"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
