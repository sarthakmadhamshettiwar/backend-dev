const jwt = require('jsonwebtoken');
let secret = "SECRET_KEY";

let token = jwt.sign({
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }, secret);
  
console.log(token);


// the output of the above code will be : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.4DvTG7o-6dgSnQWPwYOmPNnM6Kdmv30_WHIk2cXVc_8
// which is same as output from 'jwt.io' if given payload and secret key is inserted on the website.
// So token is f(header and algo) . g(payload) . h(secret key)
