import React, { createContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button } from "@mui/material";
export const ThemeContext = createContext("null");

function App() {
  const [theme, setTheme] = useState("light");
  const [isActive, setIsActive] = useState(false);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    const theBody = document.getElementById("the-body")
    theBody.classList.toggle("theBody")
  };



  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Header />
        <Button
          onClick={toggleTheme}
          checked={theme === "dark"}
          className="dark-switch"
          sx={{ color: "white" }}
          variant="text"
        >
          {isActive ? (
            <LightModeIcon
              onClick={() => {
                setIsActive(!isActive);
              }}
            />
          ) : (
            <DarkModeIcon
              onClick={() => {
                setIsActive(!isActive);
              }}
            />
          )}
        </Button>

        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
