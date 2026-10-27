from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from . import models
from core import models as core_models
import datetime
from dateutil.relativedelta import relativedelta
import json


def login_view(request):
	if request.method=="POST":
		phone=request.POST["phone"]
		password=request.POST["password"]

		user=authenticate(phone=phone, password=password)

		if user is None: success=False
		else:
			login(request, user)
			success=True
		
		return HttpResponse(json.dumps({"success": success}), content_type="application/json")

	return render(request, "accounts/login.html")


def signup_view(request):
	if request.method=="POST":
		phone=request.POST["phone"]
		password=request.POST["password"]


		if len(password)<8:
			success=False
			msg="رمز عبور باید حداقل 8 کاراکتر باشد"
		elif len(phone)!=11:
			success=False
			msg="شماره موبایل باید 11 رقم باشد"
		elif models.User.objects.filter(phone=phone).exists():
			success=False
			msg="کاربری با این شماره موبایل وجود دارد"
		else:
			success=True
			msg=""
			user = models.User.objects.create_user(
				phone=phone,
				password=password
			)

			login(request, user)

		return HttpResponse(json.dumps({"success": success, "msg": msg}), content_type="application/json")

	return render(request, "accounts/signup.html", {})


def logout_view(request):
	logout(request)
	return redirect("accounts:login")




@login_required(login_url="/accounts/login")
def dashboard(request):
	user=request.user

	if request.method=="POST":
		tag=request.POST["tag"]

		if tag!="":
			comments=core_models.comment.objects.filter(user=user, tag=tag)
		else: comments=core_models.comment.objects.filter(user=user)

		base=datetime.datetime.today()
		date_list=[base-relativedelta(months=m) for m in range(11, -1, -1)]
		labels=list(map(lambda x: f"{x.year}/{x.month}", date_list))

		data={"recommended": [], "not_recommended": [], "offensive": [], "not_offensive":[]}
		for date in date_list:
			selected_comments=comments.filter(added_date__year=date.year, added_date__month=date.month)

			recommended_cnt=selected_comments.filter(recommendation_percent__gte=0.5).count()
			not_recommended_cnt=selected_comments.filter(recommendation_percent__lt=0.5).count()
			offensive_cnt=selected_comments.filter(offensivity_percent__gte=0.5).count()
			not_offensive_cnt=selected_comments.filter(offensivity_percent__lt=0.5).count()

			
			data["recommended"].append(recommended_cnt)
			data["not_recommended"].append(not_recommended_cnt)
			data["offensive"].append(offensive_cnt)
			data["not_offensive"].append(not_offensive_cnt)

		return HttpResponse(json.dumps({"data": data, "labels": labels}), content_type="application/json")


	tags=core_models.comment.objects.filter(user=user).values_list("tag", flat=True).exclude(tag="").distinct()
	return render(request, "accounts/dashboard.html", {"tags": tags})



@login_required(login_url="/accounts/login")
def documentation(request):
	user=request.user
	api_key=user.api_key

	return render(request, "accounts/documentation.html", {"api_key": api_key})


@login_required(login_url="/accounts/login")
def change_password(request):
	if request.method=="POST":
		user=request.user

		last_password=request.POST["last_password"]
		new_password=request.POST["new_password"]

		#checking password requirements 
		if not user.check_password(last_password):
			success=False
			msg="رمزعبور فعلی صحیح نمی باشد"
		elif len(new_password)<8:
			success=False
			msg="رمزعبور جدید باید حداقل 8 کاراکتر باشد"
		else:
			success=True
			msg=""
			user.set_password(new_password)
			user.save()

			login(request, user)

		return HttpResponse(json.dumps({"success": success, "msg": msg}), content_type="application/json")


	return render(request, "accounts/change_password.html", {})