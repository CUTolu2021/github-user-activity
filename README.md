https://roadmap.sh/projects/github-user-activity
### GitHub Activity Fetcher CLI
A simple and lightweight command-line tool to quickly fetch and display the recent public activity of any GitHub user. This project is built with pure Node.js, using no external dependencies.

Prerequisites
Before you begin, ensure you have Node.js installed on your system. You can check if it's installed by running:

node -v

Installation
Clone the repository:
Open your terminal and run the following command to clone this project to your local machine.
git clone https://github.com/CUTolu2021/github-user-activity.git

Usage
To run the application, use the node command followed by the script name (index.js) and the GitHub username you want to look up.

Syntax:
node index.js <github_username>

Examples
1. Fetch activity for the user microsoft:

node index.js microsoft

2. Fetch activity for the user torvalds (creator of Linux):

node index.js torvalds

Example Output
--- Recent Activity for microsoft ---

[7/12/2025, 12:40:10 PM] - Pushed 1 commit(s) to microsoft/winget-pkgs

[7/12/2025, 12:39:55 PM] - Closed a pull request in microsoft/vscode

[7/12/2025, 12:39:40 PM] - Opened an issue in microsoft/PowerToys

-----------------------------------------

### How It Works
This script uses the built-in Node.js https module to make a GET request to the public GitHub API endpoint: https://api.github.com/users/<username>/events.

It then parses the JSON response and displays a formatted list of the 30 most recent public events, filtering for common types like pushes, issues, and pull requests.
