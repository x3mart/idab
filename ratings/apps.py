from django.apps import AppConfig


class RatingsConfig(AppConfig):
    name = 'ratings'
    verbose_name = 'Рейтинг'

    def ready(self):
        import ratings.signals
