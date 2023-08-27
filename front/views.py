from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request, "index.html")

def loja(request):
    return render(request, "loja.html")


def detalhes(request):
    return render(request, "detalhes.html")

def carrinho(request):
    return render(request, "carrinho.html")

def conta(request):
    return render(request, "conta.html")

def novaconta(request):
    return render(request, "novaconta.html")

def checkout(request):
    return render(request, "checkout.html")