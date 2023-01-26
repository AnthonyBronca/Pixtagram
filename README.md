# Pixtagram

Pixtagram is a pixel perfect clone of dark themed [Instagram](https://www.instagram.com/) where users can share posts with other users. They can show their support by liking and commenting other's posts.

Check out [Pixtagram](https://pixtagram.herokuapp.com/)

## Index

[MVP Feature List](https://github.com/BriRob/Pixtagram/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/BriRob/Pixtagram/wiki/Pixtagram-DB-Schema) |
[User Stories](https://github.com/BriRob/Pixtagram/wiki/Pixtagram-User-Stories) |
[React Components](https://github.com/BriRob/Pixtagram/wiki/Pixtagram-Components) |
[Routes](https://github.com/BriRob/Pixtagram/wiki/Front-End-Routes)

## Sign Up
![Sign up feature](https://user-images.githubusercontent.com/66566925/172113375-6f83de75-9b01-4c5a-84c3-a91de73c577d.png)

## User Profile
![Profile](https://user-images.githubusercontent.com/66566925/172114054-f95f34c1-2b3e-4d37-87b4-b23d0f78179a.png)

## Comments and Likes
![Comments and Likes](https://user-images.githubusercontent.com/66566925/172113585-15ab1c22-727d-484e-8cc1-ef9f5d90fdeb.png)
## Search
![Search](https://user-images.githubusercontent.com/66566925/172113706-b24ed8e7-3247-4a2c-8405-47d4845e88e5.png)


## Technologies Used

<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" height=40/><img src="https://camo.githubusercontent.com/a1b2dac5667822ee0d98ae6d799da61987fd1658dfeb4d2ca6e3c99b1535ebd8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707974686f6e2d3336373041303f7374796c653d666f722d7468652d6261646765266c6f676f3d707974686f6e266c6f676f436f6c6f723d666664643534" height=40/><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" height=40 /><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" height=40/><img src="https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642" height=40/><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" height=40/><img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" height=40/><img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" height=40/><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height=40/> <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" height=40/>



## Getting started
1. Clone this repository:

   ```bash
   git clone https://github.com/BriRob/Pixtagram.git
   ```

2. Install dependencies with the following:

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file using the **.envexample** provided 

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/appacademy/Module-6-Resources/blob/main/group_project_resources/s3-for-uploads-with-flask.md)

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations.

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku | -->


***

# Features 

## Users
* Guest users can create a new account
* Logged in users can read/view other user accounts
* Logged in users can update/edit their profile details and upload a profile photo
* Logged in users can delete their profile

## Posts
* Users can create a post on Pixtagram
* Users can read/view other posts
* Users can update their posts
* Users can delete their posts

## Comment
* Users can create comments on posts
* users can read/view all of the comments on a post
* Users can delete their comments on a posts
- Help me

## Likes
* Users can like posts
* Users can remove likes on posts

## Search
* Dynamic search bar. The search bar will change as the user types.
* Search-bar will send users to profile. Search is based on usernames

## Future Features
### Following
Logged-in Users can
* Follow other users
* Be followed by other users
* Tag other users in posts/comments
* Hashtags for posts

## Technical Implementation
* the search bar was particularly difficult to figure out. I had to work with creating a div that opens in a fixed position and displays items within it dynamically. I was able to find a react component download that helps with autocomplete and search functionality. It was difficult to use as it has its own attributes and ways of using CSS. It took me about a day of tinkering to figure it out and get it to work. Overall, it works more smoothly than building a custom component from scratch, and I was able to add my own style of code to that component. I will definitely be reusing that experience for future experiences.

```
<Autocomplete
                id="users-search"
                getOptionLabel={(jsonResults) => `${jsonResults.username}`}
                options={jsonResults.length === 0 ? [] : jsonResults}
                noOptionsText={'NO PEOPLE FOUND'}
                style={{ width: 250, margin:15, 'postion': 'relative', 'left': 10 }}
                renderOption={(option) => (
                    <div onClick={() => { history.push(`/users/${option.id}`) }}>
                        <React.Fragment >

                            <span
                                style={{ cursor: 'pointer' }}
                            >
                                {`${option.username}`}
                            </span>
                        </React.Fragment>
                    </div>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id='text-field'
                        placeholder='Search...'
                    />)}
            />
```
