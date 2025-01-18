import random

n=random.randint(1,100)
while True:
    try:
        gusse=int(input("Gusse the number from 1 to 100 : "))   
        if gusse<n:
            print("Too low")
        elif gusse>n:
            print("Too high")
            
        else:
            print("congratulation!! you got the number")
    except ValueError:
        print("please input a valid number")
