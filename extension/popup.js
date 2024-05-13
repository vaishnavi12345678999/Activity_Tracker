document.addEventListener('DOMContentLoaded', function() {
  
  
  const loginSection = document.getElementById('loginSection');
  const loggedInSection = document.getElementById('loggedInSection');

  // Check token and update UI
  chrome.storage.sync.get(['authToken'], function(result) {
    if (result.authToken) {
      loggedInSection.style.display = 'block';
      loginSection.style.display = 'none';
      console.log("In Logged In function");
      updateRestrictButton(result.authToken);

    } else {
      loggedInSection.style.display = 'none';
      loginSection.style.display = 'block';
    }
  });

  // Logout functionality
  document.getElementById('logout').addEventListener('click', function() {
    chrome.storage.sync.remove(['authToken'], function() {
      loggedInSection.style.display = 'none';
      loginSection.style.display = 'block';
    });
  });

  document.getElementById('restrictSite').addEventListener('click', function() {
    chrome.storage.sync.get(['authToken'], function(result) {
      if (result.authToken) {
        updateRestrictButton(result.authToken);
      }
    });
  });

  function updateRestrictButton(authToken) {
    const restrictButton = document.getElementById('restrictSite');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currentTab = tabs[0];
      if (currentTab.url.startsWith('http')) {
        restrictButton.style.display = 'block';
        restrictButton.onclick = function() {
          restrictCurrentSite(authToken, new URL(currentTab.url).hostname);
        };
      } else {
        restrictButton.style.display = 'none'; // Hide button if not on a valid page
      }
    });
  }

  function restrictCurrentSite(token, hostname) {
    console.log(hostname, token);
    fetch('http://localhost:3000/api/restricted_sites/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ hostname })
    })
    .then(response => response.json())
    .then(data => {
      alert('Site restricted successfully!');
    })
    .catch(error => {
      console.error('Error restricting site:', error);
      alert('Failed to restrict site.');
    });
  }
  // Login form submission handling
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let errors = '';
    // Validate email
    if (!email) {
      errors = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors = 'Email address is invalid.';
    }

    // Validate password
    if (!password) {
      errors += ' Password is required.';
    } else if (password.length < 8) {
      errors += ' Password must be at least 8 characters.';
    }

    // Display errors or submit form
    const errorElement = document.querySelector('.error');
    if (errors) {
      errorElement.textContent = errors;
      errorElement.style.display = 'block'; // Show error messages
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none'; // Hide error messages
      // Perform login
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          console.log(data.token);
          chrome.storage.sync.set({authToken: data.token}, function() {
            loggedInSection.style.display = 'block';
            loginSection.style.display = 'none';
          });
        } else if (data.error) {
          errorElement.textContent = data.error;
          errorElement.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Login failed. Please try again.';
        errorElement.style.display = 'block';
      });
    }
  });
});
