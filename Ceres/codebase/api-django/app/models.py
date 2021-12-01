from django.db import models

CELO = 'celo'
LOVECRYPTO = 'lovecrypto'

# Create your models here.
class Wallet(models.Model):
    WALLET_IDENTIFIER_CHOICES = (
        (CELO, 'Celo'),
        (LOVECRYPTO, 'LoveCrypto')
    )
    user = models.ForeignKey('account.User', verbose_name='Usuário', related_name='wallets', on_delete=models.CASCADE)
    currency = models.ForeignKey('core.Currency', verbose_name='Moeda', related_name='wallets', null=True, on_delete=models.SET_NULL)
    identifier = models.CharField('Identificador da carteira', max_length=150, choices=WALLET_IDENTIFIER_CHOICES)
    balance = models.DecimalField('Balanço', max_digits=50, decimal_places=10, default=0.0, blank=True, null=True)
    address = models.CharField('Endereço da carteira', max_length=150, blank=True, null=True)
    secret = models.CharField('Chave privada', max_length=500, blank=True, null=True)
    words = models.CharField('Palavras', max_length=500, blank=True, null=True)
    last_balance_update = models.DateTimeField('Última atualização do saldo', blank=True, null=True)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = "Carteira"
        verbose_name_plural = "Carteiras"
        unique_together = ['user', 'identifier']

    def __str__(self):
        return '%s - %s' % (self.user.name, self.identifier)
