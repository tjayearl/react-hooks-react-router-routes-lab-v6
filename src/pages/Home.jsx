// src/pages/Home.jsx
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Welcome to the Movie App!</h1>
        <p>Select a section from above to explore.</p>
      </main>
    </>
  );
}

export default Home;
