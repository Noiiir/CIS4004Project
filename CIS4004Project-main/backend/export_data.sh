#!/bin/bash
python manage.py dumpdata api.Console api.Game --format=json --indent=2 > game_data.json