// Integral application doman

import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);

  const getDog = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://random.dog/woof.json");
      const data = await res.json();

      if (!data.url) throw new Error("No image found");

      // Some files are videos, we filter them out
      if (data.url.endsWith(".mp4") || data.url.endsWith(".webm")) {
        return getDog(); // try again if it's a video
      }

      setDogImage(data.url);
    } catch (err) {
      console.log(err);

      // guaranteed fallback image
      setDogImage("https://images.dog.ceo/breeds/shiba/shiba-13.jpg");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  return (
    <div className="app">
      <h1>🐶 Steph's Dog Gallery</h1>

      <p className="subtitle">
        Click the button to discover random dogs! My dog Oreo is a Shih Tzu ❤️
      </p>

      <div className="card">
        {loading ? (
          <p>Loading a cute dog... 🐾</p>
        ) : (
          dogImage && (
            <img
              src={dogImage}
              alt="dog"
              style={{ width: "100%", borderRadius: "12px" }}
            />
          )
        )}

        <button onClick={getDog}>🐾 Meet Another Dog</button>
      </div>

      <div className="oreo">
        <h2>🐾 Oreo's Corner</h2>
        <p>
          My favorite breed is the Shih Tzu because that's what my dog Oreo is.
          Every dog is special, but Shih Tzus will always have a special place
          in my heart.
        </p>
      </div>

      <footer>
        <p>Created by Stephanie Sanchez</p>
        <a
          href="https://github.com/Stephmodesta"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repository
        </a>
      </footer>
    </div>
  );
}
