USE [Tournoi]
GO
DROP LOGIN IF EXISTS [ExpressUser]
GO
/****** Object:  User [ExpressUser]    Script Date: 26-05-23 14:24:20 ******/
DROP USER IF EXISTS [ExpressUser]
GO
USE [master]
GO
CREATE LOGIN [ExpressUser] WITH PASSWORD=N'Test1234=', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
/****** Object:  Database [Tournoi]    Script Date: 26-05-23 14:24:20 ******/
DROP DATABASE IF EXISTS [Tournoi]
GO
/****** Object:  Database [Tournoi]    Script Date: 26-05-23 14:24:20 ******/
CREATE DATABASE [Tournoi];
GO
USE [Tournoi]

/****** Object:  User [ExpressUser]    Script Date: 26-05-23 14:24:21 ******/
CREATE USER [ExpressUser] FOR LOGIN [ExpressUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [ExpressUser]
GO