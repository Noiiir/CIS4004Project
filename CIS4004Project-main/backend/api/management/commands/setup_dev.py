from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Sets up development environment'

    def handle(self, *args, **kwargs):
        call_command('makemigrations')
        call_command('migrate')
        call_command('collectstatic', '--noinput')