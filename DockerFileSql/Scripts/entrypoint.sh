#!/bin/bash

set -e
run_cmd="/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Test1234= -l 30 -d master -i /var/scripts/createDbAndUser.sql"

>&2 echo "Allowing 30 seconds for SQL Server to bootstrap, then creating database.."
until $run_cmd & /opt/mssql/bin/sqlservr; do
>&2 echo "This should not be executing!"
done