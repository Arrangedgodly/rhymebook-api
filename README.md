# Rhymebook API
The backend for the Rhymebook web application, developed by Grady Wasil.

## Technologies Utilized
* Express.js
* MongoDB / Mongoose
* bcrypt
* jsonwebtoken
* celebrate / joi
* cors

## API Calls
- ### Unauthorized Calls
    * POST at '/signup'
        - requires name, email, and password in the request body
        - creates / returns a new user account
    * POST at '/login'
        - requires email and password in the request body
        - returns a JWT authenticator token that stays valid for 7 days
- ### Authorized Calls
    * #### Users
        - GET at '/users/me'
            * returns the current user (determined via JWT)
        - PATCH at '/users/me/pref'
            * requires preferences in the request body
        - PATCH at '/users/me/info'
            * requires name, avatar, and email in the request body
    * #### Notes
        - GET at '/notes/'
        - POST at '/notes/'
        - GET at '/notes/:_id'
        - PATCH at '/notes/:_id'
        - DELETE at '/notes/:_id'

## Link to the project
This API can be found live at []()
