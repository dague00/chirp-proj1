# Chirper API

NOTE: This repo only contains the back-end of our project.
The interface used can be found at [dague00/chirp-react](https://github.com/dague00/chirp-react).

## Project Description

This social media application allows for text "chirps" to be sent for all to see!
This repo contains the API which handles the CRUD operations required on our chirps database.

## Technologies Used

- Express
- NodeJS
- DynamoDB

## Features

List of features ready and TODOs for future development
- Can read all chirps from DB
- Can create new chirps in DB
- Can edit chirps
- Can delete chirps
- Can create new users in DB
- Can read user data from DB

To-do list:
- Users should be able to include photos in chirps
- Users should be able to like chirps
- Users should be able to comment on chirps
- Users should be able to change profile pictures
- Users should be able to see others' bios
- Users should be able to self-validate their emails/username

## Getting Started
   
(include git clone command)
(include all environment setup steps)

> Be sure to include BOTH Windows and Unix command  
> Be sure to mention if the commands only work on a specific platform (eg. AWS, GCP)

- All the `code` required to get started
- Images of what it should look like

## Usage

The following API calls can be made:
- `GET` to `/user/all` will get all users
- `GET` to `/user/:username` will get a single user (replace `:username` with the username to find)
- `POST` to `/user` will create a user; include details in the body:

## Contributors

- [Daguinson Fleurantin](https://github.com/dague00)
- [Red Oral](https://github.com/redoral)
- [Marc Skwarczynski](https://github.com/marcski55)
- [Caleb Sword](https://github.com/calebmsword)

## License

This project uses the following license: [MIT](https://github.com/dague00/chirp-proj1/blob/51cb09bfc21f852797b836455cc1a29b2e18bd4e/LICENSE).

