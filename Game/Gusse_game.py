i=1
while(i<=3):
    print('guess')
    guess=int(input())
    i=i+1
    if guess==9:
        print('you won')
        break
else:
     print('you failed')        
