FROM node:20.17.0-alpine3.19
WORKDIR /usr/src/app
COPY . /usr/src/app/

#installer le sielleaie - cli
RUN npm install -g @angular/cli

RUN npm install
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
