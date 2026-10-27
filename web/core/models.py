from django.conf import settings
from django.db import models
from datetime import datetime



class comment(models.Model):

	user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	text=models.TextField()
	tag=models.CharField(max_length=1000, blank=True)

	recommendation_percent=models.FloatField()
	@property
	def recommended(self):
		return self.recommendation_percent>=0.5


	offensivity_percent=models.FloatField()
	@property
	def offensivity(self):
		return self.offensivity_percent>=0.5

	added_date=models.DateTimeField(default=datetime.now)

	def __str__(self):
		return f"{self.user.phone} => {self.text}"