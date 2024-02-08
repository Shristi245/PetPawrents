import random
import string
from django.conf import settings
from twilio.rest import Client  # Import the Twilio Client if using Twilio

def generate_otp(length=6):
    characters = string.digits
    otp = ''.join(random.choice(characters) for _ in range(length))
    return otp

def send_otp_phone(phone_number, otp):
    account_sid = 'ACc4c0a545b0e4f9c62696a6cd6c471421'  # Replace with your Twilio account SID
    auth_token = '2962b0e4ce02a82021a406f0775de38b'  # Replace with your Twilio auth token
    twilio_phone_number = '+19313683740'  # Replace with your Twilio phone number

    client = Client(account_sid, auth_token)
    message = client.messages.create(
        body=f'Your OTP is: {otp}',
        from_=twilio_phone_number,
        to=phone_number
    )

    print("Message SID:", message.sid)