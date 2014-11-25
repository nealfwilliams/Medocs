from django.shortcuts import render_to_response, RequestContext, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect

@login_required
def home(request):
    return render_to_response("base.html",
                              locals(),
                              context_instance=RequestContext(request))
def sign_on(request):
    if request.method == "POST":
        user = request.POST.get("username", False)
        password = request.POST.get("password", False)
        if user and password:
            user = authenticate(username=user, password=password)
            if user != None:
                login(request, user)
                return redirect(home)
    return render_to_response("signon.html", locals(), context_instance=RequestContext(request))


