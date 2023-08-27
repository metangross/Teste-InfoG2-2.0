from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    re_path(r"^loja/$", views.loja, name="loja"),
    re_path(r"^loja/produto/$", views.detalhes, name="detalhes"),
    re_path(r"^carrinho/$", views.carrinho, name="carrinho"),
    re_path(r"^conta/$", views.conta, name="conta"),
    re_path(r"^novaconta/$", views.novaconta, name="novaconta"),
    re_path(r"^login/$", views.login, name="login"),
    re_path(r"^checkout/$", views.checkout, name="checkout"),
    re_path(r"^finalizar/$", views.finalizar, name="finalizar"),
    





]