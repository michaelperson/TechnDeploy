#!/bin/bash

# set -e
# run_cmd=""
# /opt/mssql/bin/sqlservr
# >&2 echo "Allowing 30 seconds for SQL Server to bootstrap, then creating database.."
# until  $run_cmd ; do
# >&2 echo "This should not be executing!"
# done


# Launch MSSQL and send to background
    /opt/mssql/bin/sqlservr &  sleep 30
   
    /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P Test1234= -l 30 -C -d master -i /var/scripts/createDbAndUser.sql 
    # So that the container doesn't shut down, sleep this thread
    sleep infinity