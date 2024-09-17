#récupération de l'image Sql server
FROM mcr.microsoft.com/mssql/server:2019-latest 

#Variables d'environement
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=Test1234=
ENV MSSQL_PID=Express 

#Définir mes volumes
#pour les datas
VOLUME /var/opt/mssql/data
#pour les transaction logs
VOLUME /var/opt/mssql/log

#créer un dossier pour déposer la copie du scritp
WORKDIR /var
#je passe en root pour la création du dossier
USER root
RUN mkdir scripts

#copy   host                         image
COPY ./Scripts/createDbAndUser.sql /var/scripts
COPY ./Scripts/entrypoint.sh /var/scripts

#Exposer le port
EXPOSE 1433

#lancer le script entrypoint.sh pour créer la db
RUN chmod +x /var/scripts/entrypoint.sh
ENTRYPOINT ["/var/scripts/entrypoint.sh"]