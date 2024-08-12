import { BrowserRouter, Route, Routes } from "react-router-dom"
import FlashCard from './FlashCard.jsx';
import CreateFlashCard from "./createCard.jsx";
import UpdateFlashCard from "./UpdateCard.jsx";
import "./index.css";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>

            <Route path="/" element={ <FlashCard/> }/>
            <Route path="/create" element={ <CreateFlashCard/> }/>
            <Route path="/update/:id" element={ <UpdateFlashCard/> }/>

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App 