## *All End Points*

- To login 
  
  ```rest
  POST http://localhost:5000/auth/signin
  
  {
      "uname" : "username or email address(any)",
      "passwd" : "minimum 5 char long"
  }
  ```
  
- To verify if user is signed in or not
  
  ```rest
  POST http://localhost:5000/auth/signin/verify
  
  {}
  ```
  
- To Register as new user
  
  ```rest
  POST http://localhost:5000/auth/signup
  
  {
      "uname" : "minimum 5 char long cannot contain @",
      "passwd" : "minimum 5 char long",
      "email" : ""any valid email address"
  }
  ```
  
- To check availability of a new username
  
  ```rest
  GET http://localhost:5000/auth/check/uname?uname=<any username>
  ```