import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function FlashCard() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flip, setFlip] = useState(false);
    const [transitionClass, setTransitionClass] = useState("");

    const url = "https://backend-tuf-flashcard.onrender.com" ;
    // const url = "http://localhost:5001" ;


    const fetchAllData = async() => {
        try{

            const response = await fetch(`${url}`, {
                method: "GET",
            })

            const data = await response.json() ;
            
            if(response.ok) {
                setFlashcards(data) ;
            }
            else {
                console.log(`Error in FlashCard.jsx   ${data}`);
            }
        }
        catch {
            console.log("Catch Error");
        }
    }

    console.log(flashcards)

    useEffect(() => {
        fetchAllData() ;
    }, [])


    const handleFlip = () => {
        setFlip(!flip);
    };
    
    const handleNext = () => {
        setFlip(false);
        setTransitionClass("exiting-left");

        setTimeout(() => {
            setTransitionClass("entering-right");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
            setTimeout(() => {
                setTransitionClass("active");
            }, 50); 
        }, 300); 
    };
    

    const handlePrevious = () => {
        setFlip(false);
        setTransitionClass("exiting-right");

        setTimeout(() => {
            setTransitionClass("entering-left");
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
            );
            setTimeout(() => {
                setTransitionClass("active");
            }, 100); 
        }, 300);
    };

    const handleDelete = async(id) => {
        try{
            const response = await fetch(`${url}/delete/${id}`, {
                method: "DELETE"
            })

            if(response.ok) {
                fetchAllData() ;
            }
            else {
                console.log("Error");
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
        {
            flashcards.length === 0 
            ? (<>
                <div className="notFound">Oops! No card Found!</div>
                <button className="addCard"><Link to="/create">Add Card</Link></button>
            </>
            )
            : (
                <div className="cardContainer">

                    <div className="btnAndAdd">

                        <div className="buttons">
                            <button className="previousCard" onClick={handlePrevious}>Previous Card</button>
                            <button className="flipCard" onClick={handleFlip}>Flip Card</button>
                            <button className="nextCard" onClick={handleNext}>Next Card</button>
                        </div>
                        <div className="update">
                            <button className="addCard"><Link to="/create">Add Card</Link></button>
                            <button className="editCard" ><Link to={`/update/${flashcards[currentIndex].ID}`}>Edit Card</Link> </button>
                            <button className="deleteCard" onClick={() => handleDelete(flashcards[currentIndex].ID)} >Delete Card</button>
                        </div>

                    </div>

                    <div className={`card ${transitionClass} ${flip ? "flip" : ""}`}>
                        {flip ? (
                            <div className="back">
                                {flashcards[currentIndex].answer}
                            </div>
                        ) : (
                            <div className="front">
                                {flashcards[currentIndex].question}
                            </div>
                        )}
                    </div>

                </div>
            )
        }
        </>
    );
}

export default FlashCard;
