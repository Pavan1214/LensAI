import "../CssFiles/Card.css";
import React, { useState, useEffect } from 'react';

const Cards = ({ searchTerm }) => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    // This function handles the copy-to-clipboard action.
    const handleCopy = (id, description) => {
        // Use the modern navigator.clipboard API for copying
        navigator.clipboard.writeText(description).then(() => {
            setCopiedId(id); // Set the ID of the copied card
            // Reset the text back to "Copy" after 2 seconds
            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    // This effect runs whenever the 'searchTerm' prop changes.
    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            try {
                // **THIS IS THE KEY FIX FOR DEPLOYMENT**
                // In production (Vercel), it uses the REACT_APP_API_URL.
                // In development, this is empty, so the proxy is used.
                const baseUrl = process.env.REACT_APP_API_URL || '';
                const response = await fetch(`${baseUrl}/api/images?q=${searchTerm}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardsData(data);
            } catch (error) {
                console.error("Failed to fetch card data:", error);
            }
            setLoading(false);
        };

        fetchCards();
    }, [searchTerm]);

    // Filter out any cards that are missing image data to prevent crashes
    const validCards = cardsData.filter(card => card.beforeImage && card.afterImage);

    // Display a loading message while fetching data
    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading images...</p>;
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
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        {searchTerm ? `No results found for "${searchTerm}"` : "No images found."}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Cards;

