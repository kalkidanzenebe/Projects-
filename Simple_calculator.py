y=int(input("enter the second number : "))
z=input('what you want to calculate add,sub,mul,division : ')
if z == 'add':
    a=x+y
    print(a)
elif z == 'sub':
    s=x-y
    print(s)    
elif z == 'mult':
    m=x*y
    print(m)    
elif z == 'division':
    d=x/y
    print(d)    
else:
    print('no result')    
    
