import sys,os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv


load_dotenv()

def insert_game(cursor,data):
    insert_query = sql.SQL("""
    INSERT INTO nba_games (game_id, game_date, home_team,away_team)
    VALUES (%s,%s,%s,%s)
    ON CONFLICT (game_id) DO NOTHING
    """)
    cursor.execute(insert_query, data)

def insert_play(cursor,data):
    insert_query= sql.SQL("""
    INSERT INTO plays (game_id,score,quarter,quarter_time,team,description)
    VALUES (%s,%s,%s,%s,%s,%s)
    """)
    cursor.execute(insert_query,data)
    


try:
    connection = psycopg2.connect(database=os.getenv('DB_NAME'),user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"), host=os.getenv('DB_HOST'),port=os.getenv('DB_PORT'))

    cursor = connection.cursor()

    #Parsing the data file
    nbaFile = sys.argv[1]
    nbaFile = open(nbaFile,'r')

    #Skipping header
    nbaFile.readline()
    line = nbaFile.readline().strip('\n')
    items = line.split(',')
    
    insert_game(cursor,items)

    #Skipping header
    nbaFile.readline()

    for line in nbaFile:
        items = line.strip('\n').split(',')
        insert_play(cursor,items)

except (Exception, psycopg2.Error) as error:
    print(f"Error connecting {error}")

finally:
    if connection:
        connection.commit()
        cursor.close()
        connection.close()