export default function Map() {
    const latitude = 6.9394471;
    const longitude = 80.775958;
    const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    return (
        <div className="map-wrapper">
            <div className="map-card">
                {/* Left side: Information Details */}
                <div className="map-details">
                    <h3 className="map-details-title">Our Location</h3>
                    <p className="map-details-address">
                        <strong>Green Valley Cabin</strong><br />
                        Moon Plains Road, Nuwara Eliya, Sri Lanka
                    </p>

                    <hr className="map-divider" />

                    <h4 className="map-landmarks-title">Nearby Landmarks</h4>
                    <ul className="map-landmarks-list">
                        <li>
                            <span className="landmark-name">Gregory Lake</span>
                            <span className="landmark-dist">10 mins drive</span>
                        </li>
                        <li>
                            <span className="landmark-name">Nuwara Eliya Town</span>
                            <span className="landmark-dist">12 mins drive</span>
                        </li>
                        <li>
                            <span className="landmark-name">Moon Plains</span>
                            <span className="landmark-dist">15 mins drive</span>
                        </li>
                        <li>
                            <span className="landmark-name">Lovers Leap Waterfall</span>
                            <span className="landmark-dist">18 mins drive</span>
                        </li>
                        <li>
                            <span className="landmark-name">Ambewela Farm</span>
                            <span className="landmark-dist">35 mins drive</span>
                        </li>
                    </ul>

                    <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-directions-btn"
                    >
                        Get Directions
                    </a>
                </div>

                {/* Right side: Google Map IFrame */}
                <div className="map-iframe-container">
                    <iframe
                        title="Green Valley Cabin Location"
                        src={embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}