import React, { createContext, useEffect, useState, useCallback} from "react";
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

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])
    const theBody = document.getElementById("the-body")
    useEffect(() => {
      if (theme === "light") {
        theBody.classList.remove("theBody")
      } else {
        theBody.classList.add("theBody")
      }
    })
  
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

// ------------------LOCALSTORAGE------------------

useEffect(() => {
  const localNotes = window.localStorage.getItem("notes")
  if ( localNotes !== null ) {
    setNotes(JSON.parse(localNotes))
  }
}, [])

useEffect(() => {
  const localTheme = window.localStorage.getItem("theme")
  if ( localTheme !== null ) {
    setTheme(JSON.parse(localTheme))
  }
}, [])

useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes))
}, [notes])

useEffect(() => {
  localStorage.setItem("theme", JSON.stringify(theme))
}, [theme])

// ------------------LOCALSTORAGE------------------


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
        {theme === "dark" ? (
          <LightModeIcon
            onClick={toggleTheme}
          />
        ) : (
          <DarkModeIcon
            onClick={toggleTheme}
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
