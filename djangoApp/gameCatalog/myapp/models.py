from django.db import models
# from django.contrib.auth.models import User

# Create your models here.


class User(models.Model):
    email = models.EmailField(max_length = 100)
    username = models.CharField(max_length = 100)
    userid = models.CharField(max_length = 50)

    def __str__(self):
        return self.username

class Item(models.Model):
    name = models.CharField(max_length = 100)
    category = models.IntegerField()
    pubmanu = models.CharField(max_length = 100)
    year = models.IntegerField()
    quantity = models.IntegerField()
    condition = models.CharField(max_length = 100)
    price = models.IntegerField()
    userid = models.ForeignKey(User, on_delete = models.CASCADE)

    def __str__(self):
        return self.name