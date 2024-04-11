
from rest_framework import serializers

class AggregatedDataSerializer(serializers.Serializer):
    users_count = serializers.IntegerField()
    products_count = serializers.IntegerField()
    adoption_count = serializers.IntegerField()
    booking_count = serializers.IntegerField()

