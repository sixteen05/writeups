
# Input as a Service
###### Category: Misc

Tried opening the service on browser and it looked broken. We use `nc` to connect to service and it returns a python shell, which enabled us to be able to get code executed in server using python's `eval`. (every hacker's dream)

First thing to do is try importing as we have only one line, we use `__import__('os').listdir('/')`. This works we see that there's a file named `flag`.  We get the contents of using following: 
```python
__import__('os').system('cat /app/flag.txt')
```
