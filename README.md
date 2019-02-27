# ReadMe

>This repository has a structure of how a large flask application should look like. 
>
>It's a sample code base for ideas discussed over
>https://www.digitalocean.com/community/tutorials/how-to-structure-large-flask-applications

## To setup dev environment
```sh
$ virtualenv env
$ . env/bin/activate
$ pip install -r requirements.txt
```
=======

## Test
```sh
$ python manager.py test
```

## Run
``` sh
$ python manager.py upgrade
$ python manager.py seed
$ python manager.py runserver
```

`localhost:5000/users`

`localhost:5000/users/1`

