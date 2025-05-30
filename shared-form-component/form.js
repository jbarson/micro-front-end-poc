function renderSharedForm(containerId, onSubmit) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id ${containerId} not found.`);
    return;
  }

  // Define styles to be injected
  const styles = `
        #${containerId} form {
            /* Add any specific styling for the form container if needed */
        }
        #${containerId} label {
            display: block;
            margin-bottom: 5px;
            color: #333; /* Dark text for labels */
            font-weight: bold;
        }
        #${containerId} input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff; /* White background for inputs */
            color: #333; /* Dark text for input content */
            box-sizing: border-box;
        }
        #${containerId} button[type="submit"] {
            padding: 10px 15px;
            background-color: #007bff; /* Blue background */
            color: #fff; /* Light text on button */
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        #${containerId} button[type="submit"]:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }
    `;

  container.innerHTML = `
        <style>
            ${styles}
        </style>
        <form id="shared-form-${containerId}"> <!-- Unique form ID -->
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            <div>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
            <button type="submit">Submit</button>
        </form>
    `;

  const form = document.getElementById(`shared-form-${containerId}`); // Use unique form ID
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName')
    };
    console.log('Shared form submitted:', data);
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data);
    }
    // For iframe embedding, we might still want to post a message
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'SHARED_FORM_SUBMITTED', data: data }, '*');
    }
  });
}

// If this script is loaded directly in its own html (for standalone or iframe)
if (document.getElementById('shared-form-container')) {
  renderSharedForm('shared-form-container');
}

// Expose the render function for JavaScript integration
window.renderSharedForm = renderSharedForm;
