from django.urls import path
from deals.views import DealCreateView, DealUpdateView, DealsListView, DealsDetailView, DealsDeleteView

urlpatterns = [
  path("create/", DealCreateView.as_view()),
  path("update/<str:id>/", DealUpdateView.as_view()),
  path('list/', DealsListView.as_view()),
  path('<str:id>/', DealsDetailView.as_view()),
  path("delete/<str:id>/",  DealsDeleteView.as_view()),
]