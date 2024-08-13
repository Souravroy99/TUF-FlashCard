import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateFlashCard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // const url = "https://backend-tuf-flashcard.onrender.com";
  const url = "http://localhost:5001" ;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      if (response.ok) {
        console.log("Flashcard successfully added");
        navigate("/");
      } else {
        console.log("Server error while adding flashcard");
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="flashCardForm">
        <div className="formGroup">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateFlashCard;
