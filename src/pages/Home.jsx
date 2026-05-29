import logo from "../assets/logo.png";
import cabinVid from "../assets/cabin-vid.mp4";
import "./Home.css";

import g1 from "../assets/gallery/1.jpg";
import g2 from "../assets/gallery/2.jpg";
import g3 from "../assets/gallery/3.jpg";
import g4 from "../assets/gallery/4.jpg";
import g5 from "../assets/gallery/5.jpg";
import g6 from "../assets/gallery/6.jpg";
import g7 from "../assets/gallery/7.jpg";
import g8 from "../assets/gallery/8.jpg";
import g9 from "../assets/gallery/9.jpg";
import g10 from "../assets/gallery/10.jpg";
import g11 from "../assets/gallery/11.jpg";
import g12 from "../assets/gallery/12.jpg";
import g13 from "../assets/gallery/13.jpg";

const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13];

import { useState, useRef } from "react";
import GalleryLightbox from "../components/GalleryLightbox";
import bookingLogo from "../assets/booking.png";
import Map from "../components/Map";



export default function Home() {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (i) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    const nextImage = () => setLightboxIndex((i) => (i + 1) % galleryImages.length);

    const stripRef = useRef(null);

    // Contact form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        message: ""
    });
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'submitting', 'success', 'error'
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobileNumber) {
            setSubmitStatus("error");
            setStatusMessage("Please fill in all required fields marked with *.");
            return;
        }

        setSubmitStatus("submitting");

        try {
            const response = await fetch("https://formsubmit.co/ajax/hiranyae1@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New Contact Submission - Green Valley Cabin`,
                    "First Name": formData.firstName,
                    "Last Name": formData.lastName,
                    "Email": formData.email,
                    "Mobile Number": formData.mobileNumber,
                    "Message": formData.message
                })
            });

            const result = await response.json();
            if (response.ok && result.success === "true") {
                setSubmitStatus("success");
                setStatusMessage("Thank you! Your message has been sent successfully.");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNumber: "",
                    message: ""
                });
            } else {
                setSubmitStatus("error");
                setStatusMessage(result.message || "Failed to send. Please verify ckhira@gmail.com is activated.");
            }
        } catch (error) {
            setSubmitStatus("error");
            setStatusMessage("Network error. Please check your connection and try again.");
        }
    };

    const handleMouseDown = (e) => {
        const strip = stripRef.current;
        strip.isDragging = true;
        strip.startX = e.pageX - strip.offsetLeft;
        strip.scrollLeftStart = strip.scrollLeft;
    };

    const handleMouseMove = (e) => {
        const strip = stripRef.current;
        if (!strip.isDragging) return;
        e.preventDefault();
        const x = e.pageX - strip.offsetLeft;
        strip.scrollLeft = strip.scrollLeftStart - (x - strip.startX);
    };

    const handleMouseUp = () => { stripRef.current.isDragging = false; };
    return (
        <div>
            {/* Hero Section */}
            <section id="home" className="hero-section">
                <h1 className="hero-title">Slow Down. Stay Awhile.</h1>
                <p className="hero-caption">
                    Peaceful luxury cabin in the heart of Nuwara Eliya, surrounded by tea estates and endless mountain views.
                </p>
                <img src={logo} alt="Resort Logo" className="hero-logo" />

            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="about-container">

                    {/* Left: Content Block */}
                    <div className="about-content">
                        <div className="about-header">
                            <img src={logo} alt="Green Valley Cabin Logo" className="about-logo" />
                            <h2 className="about-title">About Green Valley Cabin Nuwaraeliya</h2>
                        </div>

                        <hr className="about-divider" />

                        <p className="about-text">
                            Nestled among the misty hills and tea estates of Nuwara Eliya, our luxury cabin offers a peaceful mountain escape where modern comfort meets the calm of nature. Thoughtfully designed to blend warmth, simplicity, and breathtaking scenery, each stay invites you to slow down and reconnect with what matters most. Wake up to cool mountain air and panoramic views of rolling green landscapes, enjoy quiet evenings surrounded by nature, and experience the serenity of Sri Lanka’s hill country. Whether you're seeking a romantic getaway, a relaxing retreat with friends and family, or simply a break from the noise of everyday life, our cabins are designed to create unforgettable moments in the heart of the hills.
                        </p>
                    </div>

                    {/* Right: Media Block */}
                    <div className="about-media">
                        <video
                            src={cabinVid}
                            className="about-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                        />
                    </div>

                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="gallery-section">
                <div className="gallery-header">
                    <h2 className="section-title">Gallery</h2>
                    <p className="gallery-subtitle">A glimpse into life at the cabin</p>
                </div>
                <div
                    className="gallery-strip"
                    ref={stripRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {galleryImages.map((src, i) => (
                        <div key={i} className="gallery-strip-item" onClick={() => openLightbox(i)}>
                            <img src={src} alt={`Gallery image ${i + 1}`} />
                        </div>
                    ))}
                </div>

                {lightboxIndex !== null && (
                    <GalleryLightbox
                        images={galleryImages}
                        currentIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prevImage}
                        onNext={nextImage}
                    />
                )}
            </section>
            {/* Explore Section */}
            <section id="explore" className="info-section" style={{ backgroundColor: "#faf3e0" }}>
                <h2 className="section-title">Explore</h2>
                <Map />
            </section>

            <section id="reviews" className="info-section reviews-section">
                <h2 className="section-title reviews-title">Reviews</h2>
                <div className="reviews-grid">
                    <div className="review-card">
                        <div className="review-rating">★★★★★</div>
                        <p className="review-text">
                            “We had a fantastic stay in the cabin. Beautiful location with views of tea plantations and hills. Very clean, modern, spacious, and welcoming hosts. Freshly cooked food was some of the best we’ve had in Sri Lanka.”
                        </p>
                        <span className="review-author">🇬🇧 Edward, United Kingdom</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★★</div>
                        <p className="review-text">
                            “The property is breathtaking. Perfect for alone time in nature. Stunning views, kind caretakers, and supportive staff. Will definitely be returning.”
                        </p>
                        <span className="review-author">🇦🇪 Basant, United Arab Emirates</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★☆</div>
                        <p className="review-text">
                            “Peaceful stay with great views and spacious facilities. Excellent location surrounded by tea plantations, perfect for escaping noise. Kitchen and BBQ facilities were available, rooms spacious for 6–8 guests. Minor improvements: toiletries and soundproofing.”
                        </p>
                        <span className="review-author">🇱🇰 Mariano, Sri Lanka</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★☆</div>
                        <p className="review-text">
                            “We felt very well looked after and they did everything to make our stay wonderful. Very accommodating and felt like we were well looked after.”
                        </p>
                        <span className="review-author">🇬🇧 Caitlin, United Kingdom</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★★</div>
                        <p className="review-text">
                            “Highly recommended and will be back again. Helpful staff, stunning view, comfortable facilities, and filling breakfast. Nothing to complain.”
                        </p>
                        <span className="review-author">🇱🇰 Shenal, Sri Lanka</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★★</div>
                        <p className="review-text">
                            “A cozy villa with breathtaking views surrounded by lush greenery. Peaceful atmosphere, fresh mountain air, and comfortable spaces. Perfect getaway for couples.”
                        </p>
                        <span className="review-author">🇱🇰 Vimadya de Silva, Sri Lanka</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★★</div>
                        <p className="review-text">
                            “Green Valley Resort is truly exceptional! Stunning views, serene ambiance, top‑notch amenities, and outstanding service. The staff was incredibly warm and welcoming.”
                        </p>
                        <span className="review-author">🇱🇰 Fazan Moh, Sri Lanka</span>
                    </div>

                    <div className="review-card">
                        <div className="review-rating">★★★★★</div>
                        <p className="review-text">
                            “The place was very nice. Clean and cool atmosphere with excellent service. Three double rooms, kitchen, BBQ grill, and delicious meals cooked by a local lady. Great view of the tea plantation and Moon Plains from the balcony.”
                        </p>
                        <span className="review-author">🇱🇰 Tharuka Siriwardana, Sri Lanka</span>
                    </div>
                </div>
            </section>


            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="contact-container">
                    <h2 className="contact-title">Get in Touch</h2>
                    <p className="contact-subtitle">
                        Submit your details and we'll get back to you shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="contact-row">
                            <div className="contact-field">
                                <label>First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="contact-field">
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-row">
                            <div className="contact-field">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="contact-field">
                                <label>Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="contact-field">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <button type="submit" className="contact-submit" disabled={submitStatus === "submitting"}>
                            {submitStatus === "submitting" ? "Sending..." : "Submit"}
                        </button>

                        {submitStatus && (
                            <div className={`contact-status ${submitStatus}`}>
                                {statusMessage}
                            </div>
                        )}
                    </form>

                    <div className="contact-socials">
                        <a href="https://www.instagram.com/green.valley.cabins/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="https://www.booking.com/Share-uR98Jg" target="_blank" rel="noopener noreferrer" className="social-link booking-link">
                            <img
                                src={bookingLogo}
                                alt="Booking.com"
                                style={{ height: "28px", width: "auto" }}
                            />
                        </a>
                    </div>

                    <p className="contact-footer">©2026 by Green Valley Cabins Nuwaraeliya</p>
                </div>
            </section>



        </div>
    );
}
