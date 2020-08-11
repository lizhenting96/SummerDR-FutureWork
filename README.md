# SummerDR-FutureWork
This is a simple web application built by React, Material-UI and Express.js. This web app can also connect to PostgreSQL database. 
However, there are still some more functions to be added. For example, connection between sign-up page and a posgreSQL database.

## Installation & Set-up
### Step 1: Download files
Download all files. In the root directory, there should be 2 directories and 1 file:  
-- my-react-app  
-- server  
-- .gitattributes  
### Step 2: Configure server side
1. Go to directory `/server`  
2. Run the following commands in your terminal to install all packages:  
```
npm install -g nodemon
npm install
```
`nodemon` is recommended to be installed globally.  
3. Configure your database in 'db.js'. My own settings are as follows: 
```
 user: "postgres",
 password: "password",
 host: "localhost",
 port: 5432,
 database: "SummerDR"
```
The main parts need to be changed are 'user', 'password' and 'database'.
### Step 3: Configure client side:
1. Go to directory `/my-react-app`  
2. Run the following command in your terminal to install all packages:  
```
npm install
```
## Run
### Step 1: Run server
1. Go to directory `/server` 
2. Run the following command in your terminal to start the server:  
```
npm run dev
```
3. Keep this terminal active and open a new terminal for next step
### Step 2: Run client
1. Go to directory `/my-react-app` 
2. Run the following command in your terminal to start the client:  
```
npm start
```
After a short time of loading, you should see the application running on http://localhost:3000  
Every time you want to start the application, please redo these two steps
## Webpages in this application
Users can access the following three webpages without logging in:  
http://localhost:3000 is the home page users should visit when they are not logged-in or signed-up  
http://localhost:3000/users/login is the log-in page  
http://localhost:3000/users/signup is the sign-up page  
Users need to log in to visit the following three webpages:  
http://localhost:3000/users is the welcome page for users who have already logged in  
http://localhost:3000/users/table is the page for logged-in users to search in the database  
http://localhost:3000/users/terminal is the terminal page for logged-in users  
## Known limitaions and future work
1. Log-in page and sign-up page are not connected to any database, even though there are simple form validation 
on these two pages. So, users cannot log in or sign up and then access the welcome page currently.  
2. The only way to access welcome page now is type http://localhost:3000/users in address bar.  
3. Terminal page is not connected to any database yet. So, after users refresh the page, every file created will be gone.
