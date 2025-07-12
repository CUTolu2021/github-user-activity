const https = require('https');

function getGithubActivity(username) {
    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/events`,
        method: 'GET',
        headers: {
            'User-Agent': 'Node.js-GitHub-Activity-App',
        }
    }; 
    
    const req = https.request(options, (res) => {
        if (res.statusCode === 404) {
            console.log(`User ${username} not found.`);
            return;
        }
        if (res.statusCode !== 200) {
            console.log(`Error fetching data: ${res.statusCode}`);
            return;
        }
        let body = '';
        res.on('data', (chunk) => {
            //console.log(body.length + 'st Received data chunk:', chunk);
            body += chunk;
        });
        res.on('end', () => {
            try {
                const events = JSON.parse(body);
                displayActivity(events);
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Error with request:', error);
    });

    req.end();
}

function displayActivity(events) {
    if (events.length === 0) {
        console.log('No recent activity found for this user.');
        return;
    }
    
    console.log('--- Recent GitHub Activity for ' + events[0].actor.login + ' ---');
    events.forEach(event => {
        const repoName = event.repo.name;
        const eventTime = new Date(event.created_at).toLocaleString();

        let summary = `[${eventTime}] - `;

        switch (event.type) {
            case 'PushEvent':
                const commitCount = event.payload.commits.length;
                summary += `Pushed ${commitCount} commit(s) to ${repoName}`;
                break;
            case 'CreateEvent':
                summary += `Created a new ${event.payload.ref_type} in ${repoName}`;
                break;
            case 'PullRequestEvent':
                summary += `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} a pull request in ${repoName}`;
                break;
            case 'PullRequestReviewEvent':
                summary += `Reviewed a pull request in ${repoName}`;
                break;
            case 'IssuesEvent':
                summary += `Opened a new issue in ${repoName}`;
                break;
            case 'ForkEvent':
                summary += `Forked ${repoName}`;
                break;
            case 'WatchEvent':
                summary += `Starred ${repoName}`;
                break;
            default:
                summary += `Performed an action in ${repoName}`;
                return;
        }

        console.log(summary);
    });
    console.log('------------------------------');
}

const username = process.argv[2];
if (!username) {
    console.log('Please provide a GitHub username.');
    console.log('Usage: node index.js <github-username>');
} else {
    getGithubActivity(username);
}