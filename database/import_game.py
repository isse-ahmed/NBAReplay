import sqlite3

def insert_game(cursor,data):
    insert_query = """
    INSERT OR IGNORE INTO nba_games (game_id, game_date, home_team,away_team)
    VALUES (?,?,?,?)
    """
    cursor.execute(insert_query, data)

def insert_play(cursor,data):
    insert_query="""
    INSERT INTO plays (game_id,score,quarter,quarter_time,team,description)
    VALUES (?,?,?,?,?,?)
    """
    cursor.execute(insert_query,data)
    

def main():
    try:
        connection = sqlite3.connect("nba_data.db")
        cursor = connection.cursor()

        #Opening the data file
        nbaFile = open("BostonCelticsvsDallasMavericks830PMJune122024.txt",'r')

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

        connection.commit()
        connection.close()

    except sqlite3.OperationalError as error:
        print(f"Error connecting {error}")

main()