
from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SubmitField, SelectField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp
from app.models import Review, User, Member, MembershipType
import pycountry
import phonenumbers

countries = [(country.name, country.name) for country in pycountry.countries]
country_phone_codes = []
for country in pycountry.countries:
    country_code = phonenumbers.country_code_for_region(country.alpha_2)
    if country_code:
        country_phone_codes.append((f"{country.name} (+{country_code})", f"{country.name} (+{country_code})"))


class MembershipForm(FlaskForm):

    mailing_first_name = StringField('First Name', validators=[DataRequired()])
    mailing_last_name = StringField('Last Name',validators=[DataRequired()])
    mailing_address = StringField('Mailing Address',validators=[DataRequired()])
    mailing_address_line_2 = StringField('Apt / Floor / Suite (optional)')
    mailing_country = SelectField('Mailing Country', choices=countries, default='United States', validators=[DataRequired()])
    mailing_city = StringField('City', validators=[DataRequired()])
    mailing_state = StringField('State',validators=[DataRequired()])
    mailing_postal_code = StringField('Postal Code',validators=[DataRequired()])

    use_saved_card = BooleanField("Use saved card")
    name_on_card = StringField('Name as appears on card', validators=[DataRequired()])
    card_number = StringField('Card Number', validators=[
        DataRequired(), 
        Regexp(r'^\d{16}$', message="Card number must be 16 digits")
    ])
    expiration_date = StringField('Expiration Date (MM/YY)', validators=[
        DataRequired(), 
        Regexp(r'^(0[1-9]|1[0-2])\/?([0-9]{2})$', message="Expiration date must be in MM/YY format")
    ])
    cvv = StringField('CVV', validators=[
        DataRequired(), 
        Regexp(r'^\d{3,4}$', message="CVV must be 3 or 4 digits")
    ])

    same_as_billing = BooleanField('Billing address is the same as mailing address')
    billing_address = StringField('Billing Address', validators=[DataRequired()])
    billing_adresss_line_2=StringField('Apt / Floor / Suite (optional)')
    billing_country= SelectField('Billing Country', choices=countries, default='United States', validators=[DataRequired()])
    billing_city=StringField('City', validators=[DataRequired()])
    billing_state=StringField('State', validators=[DataRequired()])
    postal_code=StringField('Postal Code', validators=[DataRequired()])


    phone_code = SelectField('Phone Code', choices=country_phone_codes, default='United States (+1)', validators=[DataRequired()])
    phone_number = StringField('Phone Number', validators=[
        DataRequired(),
        Regexp(r'^\d{10,15}$', message="Phone number must be between 10 and 15 digits")
    ])

    save_card = BooleanField('Yes, I want my save card information saved for future purchases')
    auto_renew = BooleanField('Yes, I want to save 10% by enrolling in auto-renew)')
    promo_code = StringField('Promo Code')
    submit = SubmitField("Confirm and Pay")