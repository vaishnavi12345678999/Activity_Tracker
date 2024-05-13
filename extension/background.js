let activeTabId = 0;
let activePageUrl = '';
let activeHostname = '';
let startTime = Date.now();
let siteTimeSpent = {};
let pageTimeSpent = {};
let restrictedSites = [];

chrome.runtime.onStartup.addListener(() => {
    updateRestrictedSites();
});

chrome.runtime.onInstalled.addListener(() => {
    updateRestrictedSites();
});

function updateRestrictedSites() {
    chrome.storage.sync.get(['authToken'], function(result) {
        if (result.authToken) {
            fetch('http://localhost:3000/api/restricted_sites', {
                headers: {'Authorization': `Bearer ${result.authToken}`}
            })
            .then(response => response.json())
            .then(data => {
                restrictedSites = data.map(site => site.hostname);
                // Store the restricted sites in chrome.storage.local for access across the extension
                chrome.storage.local.set({restrictedSites: restrictedSites}, () => {
                    console.log('Restricted sites updated and stored locally.');
                });
            })
            .catch((err) => {
                console.error('Error fetching restricted sites:', err);
            });
        }
    });
}

// Schedule the updateRestrictedSites to run periodically every minute
setInterval(updateRestrictedSites, 10000);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'UPDATE_RESTRICTIONS') {
        refreshRestrictions(request.token);
    }
});

function refreshRestrictions(token) {
    fetch('http://localhost:3000/api/restricted_sites', {
        headers: {'Authorization': `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(data => {
        restrictedSites = data.map(site => site.hostname);
    });
}


// Listen for tab activation and update time when it changes
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving tab:', chrome.runtime.lastError);
            return;
        }
        
        updateActiveTab(tab);
    });
});

// Listen for tab updates to handle URL changes within the same tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url) {
        console.log("updating check here not ours");
        updateActiveTab(tab);
    }
    console.log("Tab updated", tabId, changeInfo, tab);
    if (changeInfo.url) {
        console.log("New URL:", changeInfo.url);
        try {
            const hostname = new URL(changeInfo.url).hostname;
            console.log("Hostname extracted:", hostname);
            chrome.storage.local.get(['restrictedSites'], function(result) {
                chrome.tabs.sendMessage(tabId, {action: "showWarning"});
                // Optionally, close the tab after a delay or based on user interaction
                chrome.tabs.remove(tabId);
                
            });
        } catch (error) {
            console.error("Error parsing URL:", error);
        }
    }
});

// Updates active tab details and calculates time spent
function updateActiveTab(tab) {
    if (!tab.active || tab.status !== 'complete') {
        return; // Ignore inactive or incomplete tabs
    }

    updateSiteTime();
    activeTabId = tab.id;
    activePageUrl = tab.url;
    activeHostname = new URL(tab.url).hostname; // Extracts hostname for domain-level tracking
    startTime = Date.now(); // Reset start time for new active tab
}

// Update time spent on the previously active site and page
function updateSiteTime() {
    if (!activePageUrl || !activeHostname) return;

    let currentTime = Date.now();
    let timeSpent = Math.floor((currentTime - startTime) / 1000); // Time spent in seconds

    // Update domain time tracking
    if (!siteTimeSpent[activeHostname]) {
        siteTimeSpent[activeHostname] = 0;
    }
    siteTimeSpent[activeHostname] += timeSpent;

    // Update page time tracking
    if (!pageTimeSpent[activePageUrl]) {
        pageTimeSpent[activePageUrl] = 0;
    }
    pageTimeSpent[activePageUrl] += timeSpent;
    // Save updated times to local storage
    chrome.storage.local.set({siteTimeSpent, pageTimeSpent});
}

// Listener to handle when the computer wakes up or when Chrome becomes active again
chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        updateSiteTime(); // Update time if Chrome loses focus
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                updateActiveTab(tabs[0]);
            }

            
        });
    }
});

async function sendDataToServer() {
    try {
        // Get the authToken directly from chrome.storage.sync
        chrome.storage.sync.get(['authToken'], async function(result) {
            const authToken = result.authToken;
            if (!authToken) {
                console.error('No auth token available.');
                return;
            }
            // console.log("AuthToken", authToken);
            // Transform the data into a list of activities
            const today = new Date().toISOString().split('T')[0];
            const activities = [];
            for (const [url, timeSpent] of Object.entries(pageTimeSpent)) {
                activities.push({
                    hostname: new URL(url).hostname,
                    url: url,
                    time_spent: timeSpent,
                    date : today,
                });
            }
            if (activities.length === 0) {
                return;
            }
            // Perform the fetch request to send data to the server
            const response = await fetch('http://localhost:3000/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ activities })
                
            });

            const data = await response.json();
            console.log('Success:', data);
            pageTimeSpent = {};
            chrome.storage.local.set({pageTimeSpent});
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

// Schedule sendDataToServer to run periodically
setInterval(sendDataToServer, 5000);  // every 5 seconds
