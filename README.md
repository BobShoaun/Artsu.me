# team18: Artsu.me

Website:
https://artsu.me/
https://artsume-2260e.web.app/

API:
https://artsu-me.herokuapp.com/ (with SSL certificate)
http://api.artsu.me/ (without SSL certificate)

# Team Members:

- Ng Bob Shoaun (1006568992)
- Jessica Hypatia Boritz (1006163189)
- Ran Shi (1004793495)
- Louis Scheffer V (1005879284)

# Setup Instructions

The frontend is scaffolded using Create React App

1. `cd frontend`
2. `yarn install`
3. `yarn start`

The app will then be hosted on localhost:3000

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
3. Enter your username, password and password confirmation.
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
5. click login to complete process, if username or password is invalid, you will be prompted to try again
6. You wil be directed back to main page as a logged in user.

## Main Page

1. Browse from a list of artists
2. Type in the search box and press either of the search button, this navigates you to the search page
3. Click on any of the tags displayed to go to the search page with that tag as a query.
4. When logged in, hover over your name or avatar to view a dropdown menu allowing you to go to your profile page, your portfolio page, or log out.

## Search Page

1. Press on the tags, the search page will display artworks with corresponding tag
2. Type in search box and press search artist, the search page will display artists with matching name
3. Type in search box and press search artwrok, the search page will display artworks with matching name

## Artwork Page

1. Click on the artwork or the fullscreen button to view a full sized version of the piece of artwork
2. Click on the artist's picture or name to go to their portfolio
3. Up to four of the artist's other pieces of art are displayed on the right side of the page, and can be clicked on to go to the artwork page for the respective image.
4. Click on any of the tags displayed to go to the search page with that tag as a query.

## Portfolio Page

1. Click on the 'artworks' or 'contact me' button to be scrolled down to the respective section on the page.
2. Click on any of the artworks displayed in the portfolio to go to the artwork page for the respective piece.
3. A contact form is on the bottom of the page for users interested in contacting an artist. Users can enter their name, email, and a message to be sent.
4. If you are on your own portfolio page, an "edit portfolio" button will appear on the top menu, which when clicked allows you to go to the portfolio editor.
5. If you came from the main page, a back to browse button will appear at the navbar which lets you go back to the main page.

## Portfolio Editor

1. Edit Heading and about me section of portfolio in portfolio content editor page
2. Press quit to exit portfolio editor page and return to portfolio page
3. Press next to save current portfolio content and go to portfolio style editor page
4. Edit colors and layout of portfolio in portfolio style editor page
5. Press update setting to save current setting and go to portfolio page with updated setting

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
