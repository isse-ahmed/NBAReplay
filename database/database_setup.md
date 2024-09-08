# Database Setup

The database has two rows, one for NBA games and one for NBA game plays.

The NBA games are stored with:

- GameID
- GameDate
- Home Team
- Away Team

The NBA plays are stored with:

- GameID
- Score
- Quarter
- Time left in quarter
- Team
- Play

I am running postgresql on Fedora, so to create the database I ran the commands:

- sudo -u postgres psql
- CREATE USER my_username WITH PASSWORD 'my_password';
- CREATE DATABASE nba_db OWNER my_username;
