from django.db import models
APP = 'APP'
BUSINESS = 'BUSINESS'
DASH = 'DASH'
# Create your models here.


class Address(models.Model):
    name = models.CharField('Nome', max_length=250, blank=True, null=True)
    streat = models.CharField('Rua', max_length=50, blank=True, null=True)
    number = models.CharField('Número', max_length=6, blank=True, null=True)
    district = models.CharField('Bairro', max_length=50, blank=True, null=True)
    cep = models.CharField('CEP', max_length=10, blank=True, null=True)
    city = models.CharField('Cidade', max_length=50, blank=True, null=True)
    complement = models.CharField(
        'Complemento', max_length=50, null=True, blank=True)
    uf = models.CharField('Estado', max_length=3, blank=True, null=True)
    country = models.CharField('País', blank=True, null=True, max_length=50)
    latitude = models.CharField(
        'Latitude', max_length=18, blank=True, null=True)
    longitude = models.CharField(
        'Longitude', max_length=18, blank=True, null=True)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = "Endereço"
        verbose_name_plural = "Endereços"

    def __str__(self):
        return '%s - %s, %s' % (self.streat, self.number, self.district)


class Currency(models.Model):
    name = models.CharField('Nome', max_length=50)
    code = models.CharField('Código da moeda', unique=True, max_length=10)
    photo = models.ImageField(
        'Imagem', upload_to='uploads/currencies', blank=True, null=True)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = "Moeda"
        verbose_name_plural = "Moedas"

    def __str__(self):
        return '%s - %s' % (self.name, self.code)


class Interest(models.Model):
    name = models.CharField('Nome', max_length=50)
    slug = models.SlugField('Identificador', unique=True, max_length=100)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = "Interesse"
        verbose_name_plural = "Interesses"

    def __str__(self):
        return self.name


class Gender(models.Model):
    name = models.CharField('Nome', max_length=100)
    slug = models.CharField('Identificador', unique=True, max_length=10)

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = "Gênero"
        verbose_name_plural = "Gêneros"

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField('País', max_length=50)
    slug = models.SlugField('Id do país', unique=True)
    lang_code = models.CharField('Código do idioma', max_length=20)

    class Meta:
        verbose_name = "País"
        verbose_name_plural = "Países"

    def __str__(self):
        return self.name


class SystemConfig(models.Model):
    PLATFORM_CHOICES = (
        (APP, 'Aplicativo'),
        (BUSINESS, 'For Business'),
        (DASH, 'Dashboard admin')
    )
    platform = models.CharField(
        'Plataforma', max_length=20, choices=PLATFORM_CHOICES)
    version = models.CharField('Versão', max_length=50)
    released_at = models.DateField('Release feito em:')

    created = models.DateTimeField('Criado em', auto_now_add=True)
    updated = models.DateTimeField('Modificado em', auto_now=True)

    class Meta:
        verbose_name = 'Configuração'
        verbose_name = 'Configurações'

    def __str__(self):
        return self.platform + ' - ' + self.version
