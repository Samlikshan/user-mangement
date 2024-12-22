"use strict";
document
    .getElementById("signupForm")
    ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username")?.value;
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    // Make the fetch request
    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure the server understands the body as JSON
            },
            body: JSON.stringify({ username, email, password }), // Convert to JSON
        });
        // Handle response status
        if (response.ok) {
            const data = await response.json(); // Parse response body to ApiResponse
            console.log(data.message); // You can use the response data here if needed
            window.location.href = "/login"; // Redirect to login page
        }
        else {
            const errorElement = document.getElementById("errorElement");
            const errorData = await response.json();
            errorElement.innerText = errorData.error;
            return;
            //window.alert(errorData.error || 'An error occurred');
        }
    }
    catch (error) {
        console.error("Error during fetch:", error);
        window.alert("Something went wrong. Please try again.");
    }
});
