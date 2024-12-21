weight=int(input("enter your weight :"))
unit=input("enter l or kg :")
if unit=="l":
    converted=0.45*weight
    print(f"you are {converted} kilos")
else:
    converted=weight/0.45
    print(f"you are {converted} lbs")
