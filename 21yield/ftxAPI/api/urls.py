from django.conf.urls import url
from api import views

urlpatterns = [
    url(r'^api/update/allPortfolios$', views.update_all_portfolios_in_dynamodb),
    url(r'^api/canOpen/(?P<amount>[0-9]+)$', views.cash_carry_available),
    # url(r'^api/tutorials/published$', views.tutorial_list_published)
]
