# validations.py
from django.forms import ValidationError
from rest_framework import serializers
import re
from rest_framework import serializers

def validate_alphanumeric(value):
    """
    Validate that the input contains only alphanumeric characters.
    """
    if not value.isalnum():
        raise ValidationError("Only alphanumeric characters are allowed.")





def validate_email(value):
    """
    Validate that the input is a valid email address.
    """
    email_regex = re.compile(r"[^@]+@[^@]+\.[^@]+")
    if not email_regex.match(value):
        raise serializers.ValidationError("Enter a valid email address.")

def validate_password(value):
    """
    Validate the strength of the password.
    """
    # You can customize this validation based on your password requirements
    min_length = 8

    if len(value) < min_length:
        raise serializers.ValidationError(
            f"Password must be at least {min_length} characters long."
        )

    # You can add more password strength requirements as needed
    # For example, requiring at least one uppercase letter, one digit, etc.


