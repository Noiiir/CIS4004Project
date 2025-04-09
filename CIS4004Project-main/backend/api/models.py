from django.db import models

class Console(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    release_date = models.DateField()

class Game(models.Model):
    title = models.CharField(max_length=200)
    console = models.ForeignKey(Console, on_delete=models.CASCADE)
    release_date = models.DateField()
    publisher = models.CharField(max_length=100)