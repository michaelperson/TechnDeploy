FROM node:20.17.0-alpine3.19
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
EXPOSE 3000

CMD echo "Pré-chauffage de l'application" && sleep 5 && npm start