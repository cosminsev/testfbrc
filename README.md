# testfbrc
Test App Explained:

1.	Laravel RMS (laravel-rms folder): Laravel RMS is a Laravel-based web application that runs on port 8080. 
2.	OMDB Integration Service (omdb-integration-service folder): The OMDB Integration Service is a Node.js Express service that runs on port 3005. This service is responsible for integrating with the OMDB (Open Movie Database) API to fetch movie data and provide it to the main ReactJS app. 
3.	React JS Frontend (react-js-frontend folder): The React JS Frontend is the main frontend application of your system. It is built using ReactJS, a popular JavaScript library for building user interfaces. This app runs on localhost port 3010. It acts as the user-facing part of your application, allowing users to interact with the system, view movie information, and perform various actions based on the data provided by the Laravel RMS and OMDB Integration Service.

Running the Application using Docker Compose: To make it easier for the client to set up and run the entire application, Docker Compose is used to orchestrate and manage the containers for all three services. Docker Compose allows the client to define the services, their dependencies, and configurations in a single docker-compose.yml file.
Here's how the client can run the application using Docker Compose:
1.	Navigate to the root directory that contains the docker-compose.yml file.
2.	Open a terminal or command prompt in that directory.
3.	Run the following command to build and start the containers:
docker-compose up --build 
Docker Compose will use the configurations from the docker-compose.yml file to create and start containers for the Laravel RMS, OMDB Integration Service, and React JS Frontend.
4.	After the containers are up and running, the client can access the main ReactJS app in their web browser by navigating to:
http://localhost:3010/ 
This URL will lead them to the user interface of the application, where they can interact with the system, search for movies, Add/ Edit / Delete , and perform requested actions.
