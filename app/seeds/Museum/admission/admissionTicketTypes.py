## Would like to have adult, senior, visitor with disability, student, child

## adult = 30
## senior = 22
## vistor w disability = 22
##student = 17
##child = 0 

def seed_ticket_types():
    ticket_types=[
        {
            "type": "Adult",
            "price": 22,

        },
        {
            "type": "Senior", 
            "description": "65 and over with ID",
            "price": 22

        },
        {
            "type": "Visitor with Disability",
            "description": "Free admission for a care partner accompanying a visitor with a disability",
            "price": 22,
        },
        {   
            "type": "Student",
            "description": "Full-time with ID, including international students",
            "price": 17,

        },
        {
            "type": "Child",
            "description": "16 and under",
            "price": 0

        },
    ]
