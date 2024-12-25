import math

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        raise ValueError("Cannot divide by zero.")
    return x / y

def exponentiate(x, y):
    return x ** y

def square_root(x):
    if x < 0:
        raise ValueError("Cannot take the square root of a negative number.")
    return math.sqrt(x)

def calculator():
    print("Welcome to the Python Calculator!")
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Exponentiate")
    print("6. Square Root")
    print("7. Exit")

    while True:
        choice = input("Enter choice (1-7): ")

        if choice == '7':
            print("Exiting the calculator. Goodbye!")
            break

        if choice in ['1', '2', '3', '4', '5', '6']:
            if choice == '6':
                num1 = float(input("Enter number: "))
                try:
                    print(f"Square root of {num1} = {square_root(num1)}")
                except ValueError as e:
                    print(e)
            else:
                num1 = float(input("Enter first number: "))
                num2 = float(input("Enter second number: "))

                try:
                    if choice == '1':
                        print(f"{num1} + {num2} = {add(num1, num2)}")
                    elif choice == '2':
                        print(f"{num1} - {num2} = {subtract(num1, num2)}")
                    elif choice == '3':
                        print(f"{num1} * {num2} = {multiply(num1, num2)}")
                    elif choice == '4':
                        print(f"{num1} / {num2} = {divide(num1, num2)}")
                    elif choice == '5':
                        print(f"{num1} ^ {num2} = {exponentiate(num1, num2)}")
                except ValueError as e:
                    print(e)
        else:
            print("Invalid input. Please enter a number between 1 and 7.")

if __name__ == "__main__":
    calculator()
