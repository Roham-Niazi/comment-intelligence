from django.shortcuts import render, HttpResponse
from services.comment_analysis import comment_analyzer
from accounts.models import User
from . import models
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.utils import timezone


def home(request):
	if request.method=="POST":
		text=request.POST["text"]
		result=comment_analyzer.predict(text)

		return HttpResponse(json.dumps(result), content_type="application/json")

	return render(request, "home.html")


@api_view(["POST"])
def analyze_comment(request):
	api_key = request.data.get("api_key")
	text = request.data.get("text")
	tag = request.data.get("tag", "")
	date_input = request.data.get("date", "").strip()
	comment_date = None

	if not api_key:
		return Response(
			{"status": "failed", "message": "API key is required"},
			status=status.HTTP_401_UNAUTHORIZED
		)

	try:
		user=User.objects.get(api_key=api_key)
	except User.DoesNotExist:
		return Response(
			{"status": "failed", "message": "Invalid API key"},
			status=status.HTTP_401_UNAUTHORIZED
		)

	if not text or not text.strip():
		return Response(
			{"status": "failed", "message": "Text is required"},
			status=status.HTTP_400_BAD_REQUEST
		)

	if date_input:
		for fmt in ("%Y-%m-%d %H:%M", "%Y-%m-%d"):
			try:
				comment_date = datetime.strptime(date_input, fmt)
				break
			except ValueError:
				pass

		if comment_date is None:
			return Response(
				{"status": "failed", "message": "Invalid date format"},
				status=400
			)

	prediction=comment_analyzer.predict(text)

	models.comment.objects.create(
		user=user,
		text=text,
		tag=tag,
		recommendation_percent=prediction["recommendation_percent"],
		offensivity_percent=prediction["offensivity_percent"],
		added_date=comment_date or datetime.now(),
	)

	return Response({"status": "ok", "message": "Comment created successfully."})