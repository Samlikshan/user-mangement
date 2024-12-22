
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
	event.preventDefault();

	const username: string | null = (document.getElementById('username') as HTMLInputElement)?.value;
	const password: string | null = (document.getElementById('password') as HTMLInputElement)?.value;

	// Make the fetch request
	try {
		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Ensure the server understands the body as JSON
			},
			body: JSON.stringify({ username, password }), // Convert to JSON
		});

		// Handle response status
		if (response.ok) {
			const data: ApiResponse = await response.json(); // Parse response body to ApiResponse
			console.log(data.message); // You can use the response data here if needed
			window.location.href = `${data.redirectionURL}`; // Redirect to login page
		} else {
			const errorElement = (document.getElementById('errorElement') as HTMLParagraphElement)
			const errorData = await response.json();
			errorElement.innerText = errorData.error
			return
			//window.alert(errorData.error || 'An error occurred');
		}
	} catch (error) {
		console.error('Error during fetch:', error);
		window.alert('Something went wrong. Please try again.');
	}
})
