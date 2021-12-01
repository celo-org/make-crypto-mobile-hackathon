from django.contrib import admin
from django.urls import path

from . import views
from account import views as acc_views
from core import views as core_views

app_name = 'app'

urlpatterns = [

    # register app user
    path('register', views.RegisterUsertView.as_view()),
    path('auth', acc_views.AuthenticateView.as_view()),
    # path('recovery-password', acc_views.SendRecoveryPasswordEmailView.as_view()),
    # path('auth/confirm-number', acc_views.SendConfirmPhoneSMS.as_view()),
    # path('auth/confirm-email', acc_views.SendConfirmEmailView.as_view()),
    path('user/balance', acc_views.GetUserBalanceView.as_view()),
    path('user/update', acc_views.UpdateUserView.as_view()),

    # core
    path('core/genders', core_views.ListGenderView.as_view()),
    path('core/interests', core_views.ListInterestView.as_view()),
    path('core/release', core_views.GetCurrentAppVersion.as_view()),
    
    #transactions
    path('transactions/price/cusd', views.GetCeloDolarPriceView.as_view()),
    

]
