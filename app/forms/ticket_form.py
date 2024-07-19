from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SubmitField, IntegerField, SelectField, FieldList, FormField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Review, User, AdmissionTicket


              
class TicketTypeForm(FlaskForm):
    type_id = SelectField('Ticket Type', coerce=int)
    quantity = IntegerField('Quantity', validators=[DataRequired(), NumberRange(min=0)])

class TicketForm(FlaskForm):
    selected_date = SelectField('Select Date', coerce=int, validators=[DataRequired()])
    ticket_types = FieldList(FormField(TicketTypeForm), min_entries=1)
    submit = SubmitField('Purchase Tickets')
   