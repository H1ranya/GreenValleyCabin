import { useEffect } from "react";
import "./GalleryLightbox.css";

export default function GalleryLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, onPrev, onNext]);

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button className="lightbox-close" onClick={onClose}>&#x2715;</button>

            <button className="lightbox-arrow lightbox-arrow--left" onClick={(e) => { e.stopPropagation(); onPrev(); }}>&#8592;</button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} />
                <p className="lightbox-counter">{currentIndex + 1} / {images.length}</p>
            </div>

            <button className="lightbox-arrow lightbox-arrow--right" onClick={(e) => { e.stopPropagation(); onNext(); }}>&#8594;</button>
        </div>
    );
}