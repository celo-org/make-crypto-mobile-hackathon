from django.db import models
from core.models import Address, Currency, Interest, Gender

# Create your models here.
# KYC STATUS
UNDER_ANALYSIS = 'UNDER_ANALYSIS'
INVALID = 'INVALID'
VALID = 'VALID'


class User(models.Model):
    name = models.CharField('Nome', max_length=100)
    email = models.EmailField('Email', unique=True)
    phone = models.CharField('Celular', max_length=20, blank=True)
    cpf = models.CharField('CPF', max_length=15, blank=True, null=True)
    photo = models.ImageField(
        'Foto do cliente', upload_to='uploads/clients', null=True, blank=True)
    address = models.ForeignKey(
        Address, verbose_name='Endereço', on_delete=models.SET_NULL, null=True, blank=True)
    firebase_uid = models.CharField(
        'Id do firebase', max_length=128, unique=True)
    gender = models.ForeignKey(
        Gender, verbose_name='Sexo', max_length=3, blank=True, null=True, on_delete=models.SET_NULL)
    birthday = models.DateField('Data de nascimento', blank=True, null=True)
    platform = models.CharField(
        'Plataforma', max_length=10, blank=True, null=True)
    balance = models.DecimalField(
        'Saldo atual', max_digits=50, decimal_places=10, default=0.0, blank=True, null=True)
    points = models.PositiveIntegerField(
        'Pontos', blank=True, null=True, default=0)
    four_digits_pass = models.CharField("Senha de 4 dígitos", max_length=250, blank=True, null=True)
    recommendation_code = models.CharField(
        'Código de indicação', max_length=10, blank=True, null=True, unique=True)
    is_confirmed = models.BooleanField(
        'Usuário confirmou email?', default=False)
    phone_confirmed = models.BooleanField(
        'Usuário confirmou celular?', default=False)
    is_active = models.BooleanField('Usuário ativo?', default=True)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    def get_client_photo(self):
        pass

    class Meta:
        unique_together = ['email', 'firebase_uid']
        verbose_name = 'Usuário do app'
        verbose_name_plural = 'Usuários do app'
        ordering = ['-created']

    def __str__(self):
        return '%s' % (self.name)

class Preference(models.Model):
    user = models.OneToOneField(
        User, verbose_name='Usuário', on_delete=models.CASCADE, related_name='preference')
    currency = models.ForeignKey(
        Currency, verbose_name='Moeda', blank=True, null=True, on_delete=models.SET_NULL)
    interest = models.ManyToManyField(
        Interest, verbose_name='Interesses', blank=True)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = 'Preferência do Usuário'
        verbose_name_plural = 'Preferências dos Usuários'

    def __str__(self):
        return 'Config'