from django.core.management.base import BaseCommand
from django.db import connection
from api.models import Console, Game

class Command(BaseCommand):
    help = 'Export database to SQL file'

    def add_arguments(self, parser):
        parser.add_argument('--output', type=str, default='database_export.sql')

    def handle(self, *args, **options):
        output_file = options['output']
        
        with connection.cursor() as cursor:
            # Export Consoles
            cursor.execute("""
                SELECT 
                    name, 
                    manufacturer, 
                    release_date
                FROM api_console
            """)
            consoles = cursor.fetchall()
            
            # Export Games
            cursor.execute("""
                SELECT 
                    g.title,
                    g.publisher,
                    g.release_date,
                    c.name as console_name
                FROM api_game g
                JOIN api_console c ON g.console_id = c.id
            """)
            games = cursor.fetchall()

            # Write to SQL file
            with open(output_file, 'w') as f:
                # Write Console inserts
                for console in consoles:
                    f.write(
                        f"INSERT INTO consoles (name, manufacturer, release_date) "
                        f"VALUES ('{console[0]}', '{console[1]}', '{console[2]}');\n"
                    )
                
                # Write Game inserts
                for game in games:
                    f.write(
                        f"INSERT INTO games (title, publisher, release_date, console_name) "
                        f"VALUES ('{game[0]}', '{game[1]}', '{game[2]}', '{game[3]}');\n"
                    )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully exported database to {output_file}')
        )