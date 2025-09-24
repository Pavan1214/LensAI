import "../CssFiles/Card.css";
import React, { useState, useEffect } from 'react';

const Cards = ({ searchTerm }) => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. New state to track which card's text was copied
    const [copiedId, setCopiedId] = useState(null);

    // 2. New function to handle the copy action
    const handleCopy = (id, description) => {
        navigator.clipboard.writeText(description).then(() => {
            // Set this card's ID as the one that was copied
            setCopiedId(id);
            // Reset the "Copied!" text back to "Copy" after 2 seconds
            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            try {
                // --- MODIFIED LINE ---
                // Using the full Render URL directly for the API call.
                const response = await fetch(`https://lens-b-1.onrender.com/api/images?q=${searchTerm}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCardsData(data);
            } catch (error) {
                console.error("Failed to fetch card data:", error);
            }
            setLoading(false);
        };
        fetchCards();
    }, [searchTerm]);

    const validCards = cardsData.filter(card => card.beforeImage && card.afterImage);

    if (loading) {
        return <p>Loading images...</p>;
    }

    return (
        <div data-aos="fade-right" data-aos-duration="1500">
            <div className="display">
                {validCards.length > 0 ? (
                    validCards.map((card) => (
                        <div className="card" key={card._id}>
                            <div className="images">
                                <img className="before" src={card.beforeImage.url} alt="Before" />
                                <img className="after" src={card.afterImage.url} alt="After" />
                            </div>
                            <div className="title">
                                <h3>{card.title}</h3>
                                <div className="btns">
                                    {/* 3. Updated this element to be a clickable button */}
                                    <button 
                                        className="copy-btn" 
                                        onClick={() => handleCopy(card._id, card.description)}
                                    >
                                        {copiedId === card._id ? 'Copied!' : 'Copy'}
                                    </button>
                                    <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" className="create-btn">
                                        Create Now<i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                            <div id={`description-${card._id}`} className="prompt">{card.description}</div>
                        </div>
                    ))
                ) : (
                    searchTerm
                        ? <p>No results found for "{searchTerm}"</p>
                        : <p>No images found.</p>
                )}
            </div>
        </div>
    );
}

export default Cards;
