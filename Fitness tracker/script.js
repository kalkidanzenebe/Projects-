// Initialize user data from localStorage
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('userName') || 'defaultUser';
let dailyGoal = 10000; // Default daily goal

// Initialize user data if it doesn't exist
if (!users[currentUser]) {
    users[currentUser] = {
        totalSteps: 0,
        stepsPerDay: Array(7).fill(0)
    };
}

// Load user profile
document.getElementById('userName').value = currentUser;

// Save user profile
document.getElementById('saveProfile').addEventListener('click', function() {
    const newUserName = document.getElementById('userName').value.trim();

    if (newUserName && newUserName !== currentUser) {
        if (!users[currentUser]) {
            users[currentUser] = { totalSteps: 0, stepsPerDay: Array(7).fill(0) };
        }

        currentUser = newUserName;

        if (!users[currentUser]) {
            users[currentUser] = { totalSteps: 0, stepsPerDay: Array(7).fill(0) };
        }

        localStorage.setItem('userName', currentUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Profile saved!');
        updateUI();
    } else {
        alert('Please enter a valid user name.');
    }
});

// Function to update the UI
function updateUI() {
    const userData = users[currentUser];
    document.getElementById('totalSteps').innerText = userData.totalSteps;
    const progressPercentage = Math.min((userData.totalSteps / dailyGoal) * 100, 100);
    document.getElementById('progressFill').style.width = progressPercentage + '%';
    document.getElementById('dailyGoal').innerText = dailyGoal;
    updateWeeklySummary(userData);
    renderChart(userData);
}

// Add steps
document.getElementById('addSteps').addEventListener('click', function() {
    const stepsInput = document.getElementById('stepsInput');
    const steps = parseInt(stepsInput.value);

    if (!isNaN(steps) && steps > 0) {
        users[currentUser].totalSteps += steps;
        updateStepsLog(steps);
        stepsInput.value = ''; // Clear input
        checkGoal(steps);
    } else {
        alert('Please enter a valid number of steps.');
    }
    updateUI(); // Update UI after adding steps
});

// Reset steps
document.getElementById('resetSteps').addEventListener('click', function() {
    users[currentUser].totalSteps = 0;
    const today = new Date().getDay();
    users[currentUser].stepsPerDay[today] = 0; // Reset today's steps
    localStorage.setItem('users', JSON.stringify(users));
    updateUI(); // Update UI after resetting steps
});

// Set goal
document.getElementById('setGoal').addEventListener('click', function() {
    const goalInput = document.getElementById('goalInput');
    const goal = parseInt(goalInput.value);

    if (!isNaN(goal) && goal > 0) {
        dailyGoal = goal;
        goalInput.value = ''; // Clear input
        updateUI(); // Update UI after setting goal
    } else {
        alert('Please enter a valid goal.');
    }
});

// Reset goal
document.getElementById('resetGoal').addEventListener('click', function() {
    dailyGoal = 10000; // Reset to default goal
    document.getElementById('goalInput').value = ''; // Clear input field
    updateUI(); // Update UI after resetting goal
});

// Update steps log
function updateStepsLog(steps) {
    const today = new Date().getDay();
    users[currentUser].stepsPerDay[today] += steps;
    localStorage.setItem('users', JSON.stringify(users));
}

// Check goal
function checkGoal(steps) {
    if (users[currentUser].totalSteps >= dailyGoal) {
        alert(`Congratulations ${currentUser}! You have reached your daily goal!`);
    }
}

// Update weekly summary
function updateWeeklySummary(userData) {
    const totalWeeklySteps = userData.stepsPerDay.reduce((a, b) => a + b, 0);
    const averageSteps = (totalWeeklySteps / 7).toFixed(0);
    const bestDay = Math.max(...userData.stepsPerDay);

    document.getElementById('totalWeeklySteps').innerText = totalWeeklySteps;
    document.getElementById('averageSteps').innerText = averageSteps;
    document.getElementById('bestDay').innerText = bestDay;
}

// Render chart
function renderChart(userData) {
    const ctx = document.getElementById('stepsChart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous chart

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: `${currentUser}'s Steps This Week`,
                data: userData.stepsPerDay,
                borderColor: '#4CAF50',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

         // Enable/Disable notifications
document.getElementById('customNotification').addEventListener('change', function() {
    notificationsEnabled = this.checked;
});

// Export data
document.getElementById('exportData').addEventListener('click', function() {
    const userData = users[currentUser];
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Day,Steps\n" 
        + userData.stepsPerDay.map((steps, index) => `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]},${steps}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${currentUser}_steps_data.csv`);
    document.body.appendChild(link);
    link.click();
});

// Toggle theme
document.getElementById('toggleTheme').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

// List of saved users functionality
document.getElementById('userListButton').addEventListener('click', function() {
    const userList = Object.keys(users);
    const userListContainer = document.getElementById('userListContainer');
    userListContainer.innerHTML = ''; // Clear previous list

    userList.forEach(user => {
        const userItem = document.createElement('div');
        userItem.innerText = user;
        userItem.classList.add('user-item');
        userItem.addEventListener('click', function() {
            currentUser = user; // Change current user
            localStorage.setItem('userName', currentUser);
            updateUI(); // Update UI for the new user
            userListContainer.innerHTML = ''; // Clear the list after selection
        });
        userListContainer.appendChild(userItem);
    });
});

// Initial load
updateUI(); // Call to update UI initially
