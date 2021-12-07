# team18: Artsu.me

Website:

- https://artsu.me/
- https://artsume-2260e.web.app/

API:

- https://artsu-me.herokuapp.com/ (with SSL certificate)
- http://api.artsu.me/ (without SSL certificate)

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

Add .env files:

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

The frontend will then be hosted on localhost:3000 and the backend will be hosted on localhost:3001

## Run development environment

Run frontend `npm run frontend`

Run backend `npm run backend`

# Team Members:

- Ng Bob Shoaun (1006568992)
- Jessica Hypatia Boritz (1006163189)
- Ran Shi (1004793495)
- Louis Scheffer V (1005879284)

# External Libraries Used

1. Tailwindcss
   - A css utility library
2. Redux-toolkit
   - Opinionated Redux state management library
3. React-feather
   - Icon pack

# User instructions

## Sign up

1. From the main page click on the 'sign up' button at the top right corner.
2. You will then be directed to the sign up page.
3. Enter your name, username (if you do not like the automatically generated one), password and password confirmation.
4. Click sign up to complete the process.
5. You will be redirected back to main page and automatically logged in as a new user.

## Login

1. From the main page click 'login' at the top right corner.
2. You will then be directed to the login page.
3. enter you username and password for user.
   - username: user
   - password: user
4. OR for admin: enter you username and password for admin.
   - username: admin
   - password: admin
5. click login to complete the process. If the username or password entered is invalid, you will be prompted to try again.
6. You wil be directed back to main page as a logged in user.

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
4. If you are on your own portfolio page, an "edit portfolio" button will appear on the top right of the age, which when clicked allows you to go to the portfolio editor.
5. If you came from the main page, a 'back to browse butto'n will appear on the top left of the page, which lets you go back to the main page.

## Portfolio Editor

1. Select a primary, secondary, and highlight colour via the colour pickers.
2. Enter a heading and subtitle, and pick a layout for your hero section.
3. Add any experiences you would like to share. For each experience, enter a company name, position, description, and any associated artwork. Select if you want your experiences to be shared publicly with the 'keep experiences private' checkbox, and select a layout for your experiences.
4. Select any pieces of artwork you would like to share under the projects section, a layout for your pieces of artwork, and if you would like them to be shared publicly with the 'keep projects private' checkbox.
5. Select if you would like other users to be able to send you messages in the contact section.
6. Press 'quit' to return to your portfolio, or 'save' to update your portfolio settings.

## Profile Page

### Access

1. When Logged in as a user, click on your avatar and select profile.

### Features

From this page users can:

- view their artworks
- view their email
- access the upload artwork tool
- access the upload avatar tool
- change their password
- change their email
- change their name

## UploadAvatarPage

### Access

1. When Logged in as a user, click on your avatar and select profile.
2. Click Upload New Avatar.

### Features

From this page users can:

- Upload an image to be their new avatar.

## UploadImagePage

### Access

1. When Logged in as a user, click on your avatar and select profile.
2. Click Upload New Artwork.

### Features

From this page users can:

- Upload an image to be their new avatar.
  - Users must provide a summary, description, and title of the artwork to upload.

# Admin instructions

## Main Admin Panel

### Access

1. When Logged in as an admin, click on your avatar and select admin panel.

### Features

- View from a list of usernames, real names, emails, user IDs, and their ban status.
  - Click on a field to view the user profile.

## Admin User Viewer

### Access

1. When Logged in as an admin, click on your avatar and select admin panel.
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
- From this page an admin perform the following actions:
  - Remove a user's Biography
  - Remove a user's Heading
  - Remove a user's Avatar
  - Ban a User
  - Temporary Ban a user
  - Set a user to featured

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
- From this page an admin perform the following actions:
  - Ban an artwork
  - Remove a description
  - Remove a summary
  - Remove tags
  - Remove tags from the artwork
