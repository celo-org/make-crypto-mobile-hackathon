from django.db import models


class Trade(models.Model):
    exchange = models.CharField(max_length=20)
    createdAt = models.CharField(max_length=60)
    filledSize = models.IntegerField(default=0)
    future = models.CharField(max_length=10)
    tradeId = models.IntegerField(default=0)
    market = models.CharField(max_length=10)
    price = models.FloatField(default=0.0)
    remainingSize = models.IntegerField(default=0)
    side = models.CharField(max_length=10)
    size = models.IntegerField(default=0)
    status = models.CharField(max_length=10)
    type = models.CharField(max_length=10)
    clientId = models.CharField(max_length=60)

