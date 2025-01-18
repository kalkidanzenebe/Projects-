import random

options=["🥌","📰","✂"]
computer_choice=random.choice(options)
while True:
    user_choice=input("Rock,Paper,Scissor? r/s/p : ").lower()
    if user_choice=="r":
        print("your choice 🥌")
        print(f'computer choice {computer_choice}')
        if computer_choice=="✂":
            print("you win")
        else:
            print("you failed")
        conti=input("continue ? y/n")
        if conti=="y":
            continue
        else:
            break
    elif user_choice=="p":
        print("your choice 📰")
        print(f'computer choice {computer_choice}')
        if computer_choice=="🥌":
            print("you win")
        else:
            print("you failed")
        conti=input("continue ? y/n")
        if conti=="y":
            continue
        else:
            break
    elif user_choice=="s":
        print("your choice ✂")
        print(f'computer choice {computer_choice}')
        if computer_choice=="📰":
            print("you win")
        else:
            print("you failed")
        conti=input("continue ? y/n")
        if conti=="y":
            continue
        else:
            break
    else:
        print("invalid input please try again later")



