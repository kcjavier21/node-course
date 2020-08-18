console.log('Before');

// Callback-based approach

// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

// Promise-based approach
/*
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));
*/

// Async / Await approach 
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubusername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }

    catch(err) {
        console.log('Error', err.message);
    }
}

displayCommits();




function getUser(id){
    return new Promise((resolve, reject) => {
        //kick off some async work
        setTimeout(() => {
            console.log('Reading from the database...');
            resolve({ id: id, gitHubusername: 'kcjavier21' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000); 
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
    
}

console.log('After');



// Promise-based approach
/*
getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err => console.log('Error', err.message));
*/