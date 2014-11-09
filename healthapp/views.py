from django.shortcuts import render_to_response, RequestContext, HttpResponseRedirect
from django.contrib import messages

def home(request):
    return render_to_response("base.html",
                              locals(),
                              context_instance=RequestContext(request))
