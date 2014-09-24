from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'healthapp.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^thank-you/', 'healthapp.views.thankyou', name='thank you'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^mission/', 'healthapp.views.mission', name='mission'),
    )
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
