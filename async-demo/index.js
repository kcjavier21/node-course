console.log('Before');

getUser(1, getRepos);

console.log('After');

function getRepos(user) {
    getRepos(user.gitHubusername, getCommits); 
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}



function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading from the database...');
        callback({ id: id, gitHubusername: 'kcjavier21' });
    }, 2000);
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log('Calling Github API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000); 
}