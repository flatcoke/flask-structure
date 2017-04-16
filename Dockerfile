FROM python:3.5

MAINTAINER TaeminKim <flatcoke89@gmail.com>

RUN apt-get update
RUN apt-get install -y supervisor
RUN pip install uwsgi

RUN mkdir -p /deploy/flatcoke
RUN mkdir -p /deploy/log/uwsgi

ADD . /deploy/flatcoke/
WORKDIR /deploy/flatcoke

RUN pip install -r requirements.txt

COPY conf/uwsgi.ini /deploy/uwsgi.ini 
COPY conf/supervisor.conf /etc/supervisor/conf.d/

CMD ["supervisord", "-n"]
