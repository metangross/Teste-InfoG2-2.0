from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    re_path(r"^loja/$", views.loja, name="loja"),
    re_path(r"^loja/produto/$", views.detalhes, name="detalhes"),
    re_path(r"^carrinho/$", views.carrinho, name="carrinho")


]