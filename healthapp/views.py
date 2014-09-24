from django.shortcuts import render_to_response, RequestContext, HttpResponseRedirect
from django.contrib import messages

def home(request):
    return render_to_response("helloworld.html",
                              locals(),
                              context_instance=RequestContext(request))
