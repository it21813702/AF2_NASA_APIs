# Documentation

## Overview
1. Introduction
    - Application Details
    - Technology Stack
    - Software Used

2. Application Set-up
    - Prerequisites
    - Installation
    - Troubleshooting
    - Resources

3. Build Process
4. Useage
5. Report:Obstacles and Solutions


## Introduction
This is a documentation created for the purpose of describing the steps taken to create the web-application for the Application Frameworks Assignment 2.

The Web-application in question successfully performs functions related to page navigation, form submission, data querying and retrieval.

1. Technology Stack
    - Frontend Development
   	- Javascript, React.js
    - CSS Framework: Bootstrap
    - Site Hosting: Netlify(free)
    - Version Control: GitHub
   
3. Software Used
    - Code Editor: Visual Studio Code
    - Terminal: Windows Command Prompt
    - NASA APIs used: APOD, Mars Rover Photos


## Application Set-up
1.  Prerequisites
The following needs to be installed:
    - Node.js
    - NPM (Node Package Manager)

2. Installation Process
- In command line, move into working directory and run the following commands to clone the repository, install dependecies and libraries:

    ```
    git clone <http link to repo>
    npx create-react-app frontend
    npm install react-bootstrap
    npm install react-router-dom
    npm install axios
    npm install

    npm install --save-dev @babel/preset-env @babel/preset-react babel-jest

    ```
- Bootstrap is used via CDNs added to the `head` tag of `index.html` file.

    ```
    <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous" 
    />

    ```
    
3. Trouble Shooting
if there are any errors running the app related to uninstalled dependencies, run the following command:
    ```
    npm install
    ```

4. Resources
- API Endpoints from [NASA APIs](https://api.nasa.gov/)
- React-Bootstrap components from [React-Bootstrap](https://react-bootstrap.netlify.app/)


## Build Process and Deployment
The hosting platform used here requires rulesets related to routing or navigation be included in a `_redirects` file inside the `public` folder.

Without this file, the web application might run into errors when navigating to different pages through links.

After completing development:
- Open project directory path in command prompt and run the following
```
npm run build
```
- Open frontend folder and find the `build` folder
- Create an account on Netlify.com
- Navigate to manual deployment page
- Drag and drop build folder onto screen.
- App is now deployed!

Here is the link to the web-app on [Netlify](https://af2-nasa-reactapp-4c3f58.netlify.app/)

## Useage Instructions
To run the application through the command line:
- Open command prompt,
- cd into `frontend` folder,
- Run the following command:
    ```
    npm start
    ```
- you may now view the application on your browser!

>[!IMPORTANT]
> When trying to fetch images from the `Mars Rover Photos` page, you may realise that some cameras do not have any images taken on them. This is normal and not an error in the function.
>
> However as there is no way to know for sure which sols (martian days) each camera has taken images on, here are some test inputs for your convenience( You are free to try different inputs! ):
```
    Sol: 1000, 100, 90, 1200
    Camera: Navigation Camera, Mast Camera, Front Hazard Avoidance Camera

```

## Report: Obstacles and Solutions
There were a few obstacles encountered during the development of this project:

1. Figuring out how to send requests and receive requests from the NASA APIs.
- Refering to the NASA API documentaries and some youtube videos helped figure out how to structure requests and append parameters.

2. Dealing with errors due to outdated/depreciated dependencies and finding ways to work around them.
- Googling solutions and refering documentations on sites like `GeeksForGeeks` helped tremendously.

3. Figuring out why functions did not work when hosting the application but worked when running through the command line.
- the hosting platform, Netlify, had already anticipated users encountering this error and had made a documentation to guide users to fix it.

Overall, much had been learnt over the course of creating this web application.

