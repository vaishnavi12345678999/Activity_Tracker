// let activeTabId = 0;
// let activePageUrl = '';
// let activeHostname = '';
// let startTime = Date.now();
// let siteTimeSpent = {};
// let pageTimeSpent = {};

// // Listen for tab activation and update time when it changes
// chrome.tabs.onActivated.addListener(activeInfo => {
//     chrome.tabs.get(activeInfo.tabId, tab => {
//         if (chrome.runtime.lastError) {
//             console.error('Error retrieving tab:', chrome.runtime.lastError);
//             return;
//         }
//         updateActiveTab(tab);
//     });
// });

// // Listen for tab updates to handle URL changes within the same tab
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (tabId === activeTabId && changeInfo.url) {
//         updateActiveTab(tab);
//     }
// });

// // Updates active tab details and calculates time spent
// function updateActiveTab(tab) {
//     if (!tab.active || tab.status !== 'complete') {
//         return; // Ignore inactive or incomplete tabs
//     }

//     updateSiteTime();
//     activeTabId = tab.id;
//     activePageUrl = tab.url;
//     activeHostname = new URL(tab.url).hostname; // Extracts hostname for domain-level tracking
//     startTime = Date.now(); // Reset start time for new active tab
// }

// // Update time spent on the previously active site and page
// function updateSiteTime() {
//     if (!activePageUrl || !activeHostname) return;

//     let currentTime = Date.now();
//     let timeSpent = Math.floor((currentTime - startTime) / 1000); // Time spent in seconds

//     // Update domain time tracking
//     if (!siteTimeSpent[activeHostname]) {
//         siteTimeSpent[activeHostname] = 0;
//     }
//     siteTimeSpent[activeHostname] += timeSpent;

//     // Update page time tracking
//     if (!pageTimeSpent[activePageUrl]) {
//         pageTimeSpent[activePageUrl] = 0;
//     }
//     pageTimeSpent[activePageUrl] += timeSpent;

//     // Save updated times to local storage
//     chrome.storage.local.set({siteTimeSpent, pageTimeSpent});
// }

// // Listener to handle when the computer wakes up or when Chrome becomes active again
// chrome.windows.onFocusChanged.addListener(windowId => {
//     if (windowId === chrome.windows.WINDOW_ID_NONE) {
//         updateSiteTime(); // Update time if Chrome loses focus
//     } else {
//         chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//             if (tabs[0]) {
//                 updateActiveTab(tabs[0]);
//             }
//         });
//     }
// });
