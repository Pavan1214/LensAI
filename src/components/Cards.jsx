import "../CssFiles/Card.css";
import React, { useState, useEffect } from 'react';

const Cards = ({ searchTerm }) => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    // This function handles the copy-to-clipboard action.
    const handleCopy = (id, description) => {
        navigator.clipboard.writeText(description).then(() => {
            setCopiedId(id); // Set the ID of the copied cardimport "../CssFiles/Card.css";
import React, { useState, useEffect } from 'react';

const Cards = ({ searchTerm }) => {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    // This function handles the copy-to-clipboard action.
    const handleCopy = (id, description) => {
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
                // **THIS IS THE MODIFIED LINE**
                // The fetch call now points directly to your live Render server.
                const response = await fetch(`https://lens-b-1.onrender.com/api/images?q=${searchTerm}`);

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
        <div >
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
                                    <a href="https://gemini.google.com/app?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gclsrc=aw.ds&gad_source=1&gad_campaignid=20357620749&gbraid=0AAAAApk5BhkLwcFgp0knlOK6qq-Qii7_X&gclid=Cj0KCQjwrc7GBhCfARIsAHGcW5VZlIUPWAM7tq82od_2XTdAlPeWb7-wl4h77cI7BAGjW0RoqRZNU_8aAlYIEALw_wcB" target="_blank" rel="noopener noreferrer" className="create-btn">
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
                // **THIS IS THE MODIFIED LINE**
                // The fetch call now points directly to your live Render server.
                const response = await fetch(`https://lens-b-1.onrender.com/api/images?q=${searchTerm}`);

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

