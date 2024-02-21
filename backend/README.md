.env file contents:
MONGO_USERNAME
MONGO_PASSWORD
MONGO_DATABASE
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
EMAIL_TOKEN_SECRET
GOOGLE_CLIENT_ID
GMAIL_USERNAME
GMAIL_PASSWORD

docker gcloud deploy stuff

## using gloud api, does not work cuz it doesnt include .env variables for some reason

gcloud builds submit --tag gcr.io/artsu-me/artsume-backend --project artsu-me
gcloud run deploy --image gcr.io/artsu-me/artsume-backend --project artsu-me --platform managed

## using docker and push to gcr.io container registry, have to tag docker image with the registry url

docker build -t gcr.io/artsu-me/backend .
docker push gcr.io/artsu-me/backend

# Deploy steps

npm run deploy:gcloud

then go to gcloud and edit service to use new docker image version.

## Update 2024 Feb

Artsume api is no longer hosted on google cloud but on render.com under the artsu.me18@gmail.com account.

Render provided url: https://artsu-me.onrender.com
Custome domain url: https://api.artsu.me
