// const p = Promise.resolve({ id: 1});
// p.then(result => console.log(result));

// const p = Promise.reject(new Error('Reasons for rejection...'));
// p.catch(error => console.log(error));

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Authenticating p1...');
        resolve(1);
        //reject(new Error('Because something failed...'));
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Authenticating p2...');
        resolve(2);
    }, 2000);
})

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error ', err.message));