// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });


async function displayMovies() {
    try {
        const customer = await getCustomer(1);
        console.log(customer);
        if (customer.isGold) {
            const topMovies = await getTopMovies();
            console.log(topMovies);
            const email = await sendEmail(customer.email, topMovies.movies);
        }
    }
    catch(err) {
        console.log('Error: ' + err);

    }
}

displayMovies();
  
  function getCustomer(id) {
      return new Promise((resolve, reject) => {
            setTimeout(() => {
            console.log('Customer: ');
            resolve({ 
                id: 1, 
                name: 'Mosh Hamedani', 
                isGold: true, 
                email: 'email' 
            });
        }, 2000);  
    });
  }
  
  function getTopMovies() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Top movies: ');
            resolve(['movie1', 'movie2']);
        }, 2000);
    });
  }
  
  function sendEmail(email, movies, callback) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Email sent...');
            resolve();
          }, 2000);
    });    
  } 