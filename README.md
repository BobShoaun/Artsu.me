this commit should be graded as late
# Artsu.me

```
░█████╗░██████╗░████████╗░██████╗██╗░░░██╗░░░███╗░░░███╗███████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║░░░██║░░░████╗░████║██╔════╝
███████║██████╔╝░░░██║░░░╚█████╗░██║░░░██║░░░██╔████╔██║█████╗░░
██╔══██║██╔══██╗░░░██║░░░░╚═══██╗██║░░░██║░░░██║╚██╔╝██║██╔══╝░░
██║░░██║██║░░██║░░░██║░░░██████╔╝╚██████╔╝██╗██║░╚═╝░██║███████╗
╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░░╚═════╝░╚═╝╚═╝░░░░░╚═╝╚══════╝
```
Showcase your projects and experiences as an artist, share your amazing artworks, connect with the best art community.

Website:

- https://artsu.me/
- https://artsume-2260e.web.app/

API:

- https://artsu-me.herokuapp.com/ (with SSL certificate)
- http://api.artsu.me/ (without SSL certificate)

# Team Members (team18):

- Ng Bob Shoaun (1006568992)
- Jessica Hypatia Boritz (1006163189)
- Ran Shi (1004793495)
- Louis Scheffer V (1005879284)

# Developer instructions

## Setup

Install dependencies:

Frontend

```
cd frontend
yarn install
```

Backend

```
cd backend
npm install
```

## Add .env files:

Frontend

```
REACT_APP_API_URL=http://localhost:3001
```

Backend

```
MONGO_USERNAME=user
MONGO_PASSWORD=1gmj6YB5EnsCnPfJ
MONGO_DATABASE=artsume
CLOUDINARY_NAME=artsu-me
CLOUDINARY_API_KEY=853874317566352
CLOUDINARY_API_SECRET=8CyIIYxpIV7wPR4Zy-crkHdySPc
ACCESS_TOKEN_SECRET=cc882d877177534c708dbd7a93b3bf235bf3c35c4b19c9d239ff9a7b649e7db33a57a536dcdacd591c7815daede48ad59f258e74871f250dd47bfb45bcf33743
```

## Run development environment

Run frontend ```npm run frontend```

Run backend ```npm run backend```

The frontend will then be hosted on localhost:3000 and the backend will be hosted on localhost:3001



# Tech Stack
- Frontend
  - React
      - component framework library
  - React-router
      - routing library for react
  - TailwindCSS
      - A css utility library
  - Redux-toolkit
      - Opinionated Redux state management library
  - React-feather
      - Icon pack
- Backend
  - Express
      - server framework
  - Node.js
  - Cloudinary
      - Image server
  - MongoDB
      - NoSQL database
  - Mongoose
      - Interface for mongodb
  - Jest & Supertest
      - API unit testing

# User instructions

## Sign up

1. From the main page click on the 'sign up' button at the top right corner.
2. You will then be directed to the sign up page.
3. Enter your name, username (if you do not like the automatically generated one), password and password confirmation.
4. Click sign up to complete the process.
5. You will be redirected back to the main page and automatically logged in as a new user.

## Login

1. From the main page click 'login' at the top right corner.
2. You will then be directed to the login page.
3. enter your username and password for user.
   - username: user
   - password: user
4. OR for admin: enter your username and password for admin.
   - username: admin
   - password: admin
5. click login to complete the process. If the username or password entered is invalid, you will be prompted to try again.
6. You will be directed back to the main page as a logged in user.

--or--
1. When not logged in and attempting to view a page that requires verification a user will be redirected to the login screen.
2. After logging in, the user will be redirected back to the page where they came from. (destination URL params)

## Navbar

1. Return to the homepage by clicking the "artsu.me" logo
2. Perform a search by typing in the search box and pressing either the enter key or the button. This will navigate you to the search page.
3. Press the bell icon to view any messages you have been sent. If you have new messages, the bell will have a red glow. To mark a message as read, press the check button.
4. When logged in, hover over your name or avatar to view a dropdown menu allowing you to go to your profile page, your uploaded artwork page, your portfolio page, or log out.

## Main Page

1. Click on a tag to view all artwork with that tag on the search page.
2. Browse from the top artworks on Artsume. Click on a piece of artwork to go to its artwork page.
3. Browse from a list of artists on Artsume. Click on a user to go to view their portfolio.

## Search Page

1. Click on a tag to search for all artwork with that tag.
2. Clear your search, or change your search between searching for artwork and searching for artists with the options on the top right
3. Click on any artwork displayed to go to the artwork page for that artwork.

## Artwork Page

1. Click on the artwork or the fullscreen button to view a full sized version of the piece of artwork.
2. Press the like button to like (or remove your like, if you have already liked) a piece of artwork.
3. Click on the report button to bring up a form where you can report a piece or artwork.
4. Click on the artist's picture or name to go to their portfolio.
5. Up to three of the artist's other pieces of art are displayed on the right side of the page, and can be clicked on to go to the artwork page for the respective image.

## Portfolio Page

1. Click on the 'experiences', 'projects', or 'contact me' button to be scrolled down to the respective section on the page.
2. Click on any of the artworks displayed in the portfolio to go to the artwork page for the respective piece.
3. A contact form is on the bottom of the page for users interested in contacting an artist. Users who are logged in can send a message by entering a subject and message, and then pressing the 'submit' button.
4. If you are on your own portfolio page, an "edit portfolio" button will appear on the top right of the page, which when clicked allows you to go to the portfolio editor.
5. If you come from the main page, a 'back to browse’ button will appear on the top left of the page, which lets you go back to the main page.

## Portfolio Editor

1. Select a primary, secondary, and highlight colour via the colour pickers.
2. Enter a heading and subtitle, and pick a layout for your hero section.
3. Add, remove or edit any experiences you would like to share. For each experience, enter a company name, position, description, and select any associated artworks. Select if you do not want your experiences to be shared publicly with the 'keep experiences private' checkbox, and select a layout for your experiences.
4. Select any pieces of artwork you would like to share under the projects section, a layout for your pieces of artwork, and if you would not like them to be shared publicly with the 'keep projects private' checkbox.
5. Select if you would like other users to be able to send you messages in the contact section.
6. Press ‘view portfolio’ to go back to your portfolio, press ‘save’ to save the current information in the portfolio.
7. If you try to save with an experience with an empty field, you get an error message and the portfolio does not save.
8. Press ‘manage all artworks’ to go to your artworks page

## Profile Page

1. Update your name or username by changing the value and pressing ‘update info’
2. Update your password by entering it into the ‘new password’ and ‘confirm password’ boxes, and pressing ‘change password’
3. Change your avatar by pressing ‘update avatar’, selecting an image from your computer, and clicking ‘upload’.
4. Access the portfolio editor from the button on the bottom of the page.

## Artworks Page

1. Upload new artworks by pressing ‘upload artwork’ and then selecting an image, setting a title, summary, and description, choosing the appropriate tags for your piece of artwork, and pressing upload.
2. Click on the ‘delete’ button to delete a piece of artwork.
3. Click on the ‘edit’ button to edit a piece of artwork. You can change the title, summary, description, and tags (everything but the image).
4. Click the ‘view’ button to go to the artwork page for a piece of artwork.

## 403 Forbidden Page

1. When attempting to access an admin page while logged in as a non-admin user you will be redirected to the 403 page.

## 404 Not Found Page

1. When attempting to access a URL which does not exist you.
2. Entering a page which triggers a 404 response from the API. For example going to portfolio page where the username does not exist


## Loading Page

1. Appears when a page is currently being loaded in but has not completed yet


# API Documentation

- GET /users?query=&limit=&offset=
  - get all users, sorted by featured, excluding banned users
  - supports querying and pagination via limit and offset.
- GET /users/:userId
  - get user with userId
- PATCH /users/:userId
  - edit user with userId
  - needs authentication or admin rights
  - example body:
    ```
    [
        { "op": "replace", "path": "/name", "value": "The Epic User" },
        { "op": "replace", "path": "/isBanned", "value": false },
        { "op": "replace", "path": "/isFeatured", "value": true },
    { "op": "replace", "path": "/username", "value": “the-epic-user” },
    ]
    ```
- DELETE /users/:userId
    - delete user with userId
    - needs authentication and admin rights
- PUT /users/:userId/avatar
    - needs authentication or admin rights
- DELETE /users/:userId/avatar
    - needs authentication or admin rights

- GET /artworks?query=&limit=&offset=
    - get all artworks, sorted by number of likes, excluding banned artworks
    - supports query, and pagination with limit and offset

- GET /artworks/:artworkId
    - get artwork with artworkId
- PATCH /artworks/:artworkId
    - edit artwork with artworkId
    - needs authentication or admin rights
     - example body:
    ```
    [
        { "op": "replace", "path": "/name", "value": "The Epic Artwork" },
        { "op": "replace", "path": "/isBanned", "value": false },
        { "op": "add", "path": "/tagIds/0", "value": “61abdf85a32b7cf09720a51b” },
    ]
    ```
- POST /users/:userId/artworks
    - add new artwork for the user with userId
    - needs authentication or admin rights
    - example body:
    ```
    {
        “name”: “new-artwork”,
        “summary”: “summary for artwork”,
        “description”: “description for artwork”,
        “tagIds”: [‘tagId1234567’’],
    }
    ```
- DELETE /users/:userId/artworks/:artworkId
    - delete artwork with artworkId from user with userId
    - needs authentication or admin rights
- GET /users/:userId/artworks
    - get all artworks of user with userId
- POST /artworks/:artworkId/reports
    - add report to artwork with artworkId
    - needs authentication
    - example body: 
    ```
    {
        "userId": “61afe6abbe0e0a42dfab667a”,
        "message": “This artwork is owned by myself”,
    }

     ```
- POST /artworks/:artworkId/like
    - add like to artwork with artworkId
    - needs authentication or admin rights
    - does not have a body
- DELETE /artworks/:artworkId/unlike
    - unlike artwork with artworkId
    - needs authentication or admin rights

- POST /users/register
    - registers a new user
    - example body: 
    ```
    {
        "username": "firstname-lastname,
        "password": "iloveyou",
        "name": "Firstname Lastname"
    }

     ```
- POST /users/login
    - Logins in a user and returns an access token
    - example body:
    ```
    {
        "username": "firstname-lastname,
        "password": "iloveyou",
        "name": "Firstname Lastname"
    }
     ```

- PUT /users/:userId/password
    - edits the password for user with userId
    - needs authentication or admin rights
- GET /users/:userId/messages/sent
    - get all send messages for user with userId
    - needs authentication or admin rights
- GET /users/:userId/messages/received
    - get all received messages for user with userId
    - needs authentication or admin rights

- GET /users/:userId/messages/:messageId
    - get message with messageId for user with userId
    - needs authentication or admin rights
- POST /users/:userId/messages
    - send message as userId
    - needs authentication

- PATCH /users/:userId/messages/:messageId/remove
    - mark message as read
    - needs authentication

- GET /users/username/:username/portfolio
    - Returns the portfolio of the specified username
- GET /users/:userId/portfolio
    - Returns the portfolio of the specified userId
- PATCH /users/:userId/portfolio
    - Modifies the portfolio of a user
    - needs authentication or admin rights
    - example body:
    ```
    [
        { "op": "replace", "path": "/section/hero/heading", "value": "Why Im so good" },
        { "op": "add", "path": "/section/projects/artworkIds/-", "value": “61acd618b7315b51a91bd105” },
        { "op": "remove", "path": "/section/experiences/experiences/2" },
    ]
    ```


- GET /tags
    - Returns all tags
- GET /tags/:tagId
    - Returns the tag at the specified id
- POST /tags
    - Creates a tag for use
    - example body: 
    ```
    {
        "label": "Oil Painting,
        "color": #F97316,
    }

     ```
- PATCH /tags/:tagId
    - Modify the details of a tag
    - example body:
    ```
    [
        { "op": "replace", "path": "/label", "value": "my-tag" },
    { "op": "replace", "path": "/color", "value": "#c0ffee" },
    ]
    ```

- DELETE /tags/:tagId
    - Deletes a tag from the database

- POST /images
    - upload image to cloudinary (for testing purposes)
    - example body: multipart form data
    ```
    {
        image: <image-file>
    }
    ```
- DELETE /images/:imageId
    - delete image from cloudinary (for testing purposes)

# Admin instructions

## Main Admin Panel

### Access

1. When Logged in as an admin, click on your avatar and select the admin panel.

### Features

- View from a list of usernames, real names, avatarUrls, user IDs, admin status, featured status, and their ban status.
   Click on a field to view the user profile.
 - View all tags label, ids, and colors
 - Add a new tag

## Admin User Viewer

### Access

1. When Logged in as an admin, click on your avatar and select the admin panel.
2. View from a list of usernames, real names, emails, user IDs, and their ban status.
3. Click on a field to view the user profile.

### Features

- From this page an admin view a user's:
  - Name
  - Username
  - Heading
  - Biography
  - Avatar
  - Ban status
  - Artworks
  - Admin Status
- From this page an admin perform the following actions:
  - Remove a user's Biography
  - Remove a user's Heading
  - Remove a user's Avatar
  - Ban a User
  - Set a user to featured
  - Make another user an admin

## Admin Artwork Viewer

### Access

1. When Logged in as an admin, click on your avatar and select admin panel.
2. View from a list of usernames, real names, emails, user IDs, and their ban status.
3. Click one a field to view the user profile.
4. Click on an artwork from the user.

### Features

- From this page an admin view an artwork's:
  - Image
  - Description
  - Artist
  - Tags
  - Summary
  - Reports
- From this page an admin perform the following actions:
  - Ban an artwork
  - Remove a description
  - Remove a summary
  - Remove tags from the artwork

# Project Directory Structure

team18

├── backend

│   ├── src

│   │     ├── helpers

│   │     ├── middlewares

│   │     ├── models

│   │     ├── routes

│   │     ├── tests

│   │     ├── app.js

│   │     ├── cloudinary.js

│   │     ├── config.js

│   │     ├── index.js

│   │     └── mongo.js

│   ├──.env

│   ├──package-lock.json

│   └──package.json

│

├── frontend

│   ├── public

│   │     ├── index.html

│   │     ├── manifest.json

│   │     └── robots.txt

│   │

│   ├── src

│   │     ├── AdminArtworkViewer

│   │     ├── AdminPanel

│   │     ├── AdminProfileViewer

│   │     ├── ArtworkListPage

│   │     ├── ArtworkPage

│   │     ├── components

│   │     ├── hooks

│   │     ├── LoginPage

│   │     ├── MainPage

│   │     ├── PortfolioEditorPage

│   │     ├── PortfolioPage

│   │     ├── ProfilePage

│   │     ├── RegisterPage

│   │     ├── SearchPage

│   │     ├── App.jsx

│   │     ├── config.js

│   │     ├── index.css

│   │     └── index.js

│   │

│   ├── .env

│   ├── craco.config.js

│   ├── package.json

│   ├── tailwind.config.js

│   └── yarn.lock

└── package.json
