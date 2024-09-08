#!/bin/bash

psql nba_db << EOF

-- Create the games table
CREATE TABLE IF NOT EXISTS nba_games (
    game_id VARCHAR(50) PRIMARY KEY,
    game_date VARCHAR(50) NOT NULL,
    home_team VARCHAR(50) NOT NULL,
    away_team VARCHAR(50) NOT NULL
);

-- Create the plays table

CREATE TABLE IF NOT EXISTS plays (
    play_id SERIAL PRIMARY KEY,
    game_id VARCHAR(50) NOT NULL,
    score VARCHAR(10) NOT NULL,
    quarter INTEGER NOT NULL,
    quarter_time INTERVAL NOT NULL,
    team VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES nba_games(game_id)
);

-- Create an index for faster retrieval
CREATE INDEX IF NOT EXISTS idx_plays_game_sequence ON plays (game_id, play_id); 

EOF