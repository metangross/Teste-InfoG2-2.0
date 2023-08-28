# Teste InfoG2 2.0

A repository for the coding test of Infog2

# Tutorial

## Docker
This project uses Docker, you'll need to install Docker to properly run the website, in case you don't have Docker installed, you can download it in this website: https://docs.docker.com/get-docker/

## .env
Before executing the website, you'll need to set the .env file. Firstly, rename the ".env.sample" file to ".env". Then, insert values into the variables of the .env file. The variables are detailed bellow:

1. SECRET_KEY: A Django secret key, which you can generate in this website: https://djecrety.ir/
  
## Execute the API
 
Before executing the website, you'll need to start the docker program, and then use the following commands on the root directory of this project:

``` docker-compose build ```

This command will download the images and build the services required to run the website. After that you'll just need to use this command:

``` docker-compose up ```

And then the website will work properly.
