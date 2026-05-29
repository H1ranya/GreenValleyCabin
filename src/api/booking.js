export async function checkAvailability() {
    // Example Booking.com API call
    const response = await fetch("/api/booking/check", { method: "POST" });
    return await response.json();
}
