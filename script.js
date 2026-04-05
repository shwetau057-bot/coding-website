const appContent = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-links a, .btn-primary');
const themeToggle = document.getElementById('theme-toggle');

// Mock User State
let userState = {
    points: 1250,
    level: 'Intermediate',
    badges: ['HTML Pioneer', 'CSS Stylist', 'JS Novice']
};

// Routing 
const routes = {
    home: `
        <div class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Master Coding <br>From zero to <span class="highlight">Expert</span></h1>
                <p class="hero-subtitle">Interactive gamified learning path with real-world projects, bite-sized lessons, and instant feedback.</p>
                <button class="btn btn-primary" onclick="navigate('courses')">Start Learning</button>
            </div>
            <div class="hero-visual">
                <div class="glow-orb"></div>
                <img src="hero_illustration_1775399737379.png" alt="Coding UI Illustration" style="max-width: 100%; border-radius: 12px; z-index: 10; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3);" onerror="this.style.display='none'">
            </div>
        </div>
    `,
    courses: `
        <h2>Learning Paths</h2>
        <div class="grid-container">
            <div class="card glass">
                <h3>1. Beginner</h3>
                <p>HTML, CSS & Basic Python.</p>
                <div class="badge">0 / 12 Lessons</div>
                <button class="btn btn-primary" style="margin-top:auto" onclick="navigate('practice')">Start</button>
            </div>
            <div class="card glass">
                <h3>2. Intermediate</h3>
                <p>JavaScript, Advanced Python & SQL.</p>
                <div class="badge">Locked</div>
            </div>
            <div class="card glass">
                <h3>3. Advanced</h3>
                <p>React, APIs, Data Structures.</p>
                <div class="badge">Locked</div>
            </div>
            <div class="card glass">
                <h3>4. Expert</h3>
                <p>Real-world tasks & System Design.</p>
                <div class="badge">Locked</div>
            </div>
        </div>
    `,
    practice: `
        <h2>Practice Area</h2>
        <div class="grid-container">
            <div class="card glass">
                <h3>Code Challenges</h3>
                <p>Solve algorithm challenges in 10+ languages.</p>
                <button class="btn btn-primary">Solve</button>
            </div>
            <div class="card glass">
                <h3>Bug Squasher</h3>
                <p>Find the bug in the provided snippet.</p>
                <button class="btn btn-primary">Squash Bugs</button>
            </div>
            <div class="card glass">
                <h3>Output Prediction</h3>
                <p>Guess the output of the code block.</p>
                <button class="btn btn-primary">Play</button>
            </div>
        </div>
    `,
    games: `
        <h2>Coding Games</h2>
        <div class="grid-container">
            <div class="card glass">
                <img src="game_thumbnail.png" alt="Game Logo" style="border-radius: 8px; margin-bottom: 1rem;" onerror="this.style.display='none'">
                <h3>Flexbox Zombies</h3>
                <p>Learn CSS Flexbox by surviving the apocalypse.</p>
                <button class="btn btn-primary">Play Game</button>
            </div>
            <div class="card glass">
                <h3>TypeRacer Code</h3>
                <p>Test your typing speed with real code snippets.</p>
                <button class="btn btn-primary">Race Now</button>
            </div>
        </div>
    `,
    projects: `
        <h2>Projects Portfolio</h2>
        <div class="grid-container">
            <div class="card glass">
                <h3>Build a Weather App</h3>
                <p>Fetch APIs and display data dynamically.</p>
                <div class="badge">+500 Points</div>
            </div>
            <div class="card glass">
                <h3>To-Do List with LocalStorage</h3>
                <p>Master state and browser storage.</p>
                <div class="badge">+300 Points</div>
            </div>
        </div>
    `,
    dashboard: `
        <div class="dashboard-header">
            <h2>Welcome back, Coder!</h2>
            <div class="stats-container">
                <div class="stat-box glass">
                    <div class="stat-value">\${userState.points}</div>
                    <div style="color: var(--text-muted)">Total Points</div>
                </div>
                <div class="stat-box glass">
                    <div class="stat-value" style="color: var(--warning)">\${userState.level}</div>
                    <div style="color: var(--text-muted)">Current Rank</div>
                </div>
            </div>
        </div>
        <div class="card glass">
            <h3>Earned Badges</h3>
            <div style="display:flex; gap: 1rem; margin-top: 1rem;">
                \${userState.badges.map(b => '<span class="badge">' + b + '</span>').join('')}
            </div>
        </div>
    `,
    leaderboard: `
        <h2>Global Leaderboard</h2>
        <div class="card glass" style="margin-top: 2rem;">
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Level</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>ByteKing</td><td>Expert</td><td>9500</td></tr>
                    <tr><td>2</td><td>CodeNinja</td><td>Advanced</td><td>8200</td></tr>
                    <tr><td>3</td><td>JS_Wizard</td><td>Advanced</td><td>7850</td></tr>
                    <tr style="background: rgba(109, 40, 217, 0.2)">
                        <td>142</td><td>You</td><td>Intermediate</td><td>1250</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    login: `
        <div style="max-width: 400px; margin: 0 auto;" class="card glass">
            <h2 style="text-align: center; margin-bottom: 2rem;">Join CodeMaster</h2>
            <form onsubmit="event.preventDefault(); navigate('dashboard');">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required placeholder="you@example.com">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" required placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%">Sign In</button>
            </form>
        </div>
    `
};

function navigate(route) {
    if (!routes[route]) return;
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.route === route) {
            link.classList.add('active');
        }
    });

    // Render content
    appContent.innerHTML = routes[route];
}

// Event Listeners for Nav
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = e.target.dataset.route;
        if(route) navigate(route);
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Initial Render
navigate('home');
