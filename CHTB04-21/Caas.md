
# Caas
###### Category: Web

This for me was easy to figure out but hard to crack. Looking at source code we can easily identify first line
```php
        $this->command = "curl -sL " . escapeshellcmd($url);
```
and then an `exec` of command. 
There is also a validation check for only DN but that's only client side check and sending a raw POST bypasses that. Then next hurdle comes at `escapeshellcmd`, which [escapes good number of symbols](https://www.php.net/manual/en/function.escapeshellcmd.php) before creating the string. (Skip 2 paragraphs for solution)

Here you might waste a lot of time trying to bypass escape function and trying different things as you get to know that `[Space]` is not escaped by the function.   But the solution is rather simple (this truck me after 3 hours).

One thing which is absolutely needed is for you to have local server hosted on internet. The easiest and fastest way is to bring up a [echo-server](https://pypi.org/project/echo-server/) (isn't really that good and I'm planning to have mine soon) and server it using [nginx](https://ngrok.com/).
You could maybe try to `cat` the flag file and send as path param/query param to your local server and log all requests and then read the path. Or maybe just copy file into assets directory to be able to read it via browser. But that fails because most of the times, because execution is mostly guaranteed to not work with `escapeshellcmd`. 

Solution is just to send the `flag` file itself as a HTTP Post data to your local server and just read the POST content using `--data "@/flag"`.
