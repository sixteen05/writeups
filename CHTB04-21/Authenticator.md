# Authenticator
###### Category: Reversing

You are given a executable and we need to be able to make it print our flag.
For any executable, first thing I do is understand what the executable does and what I can get without even executing it. 
Run `file` , it gives you 
```bash
$ file ./authenticator/authenticator 
./authenticator: ELF 64-bit LSB shared object, x86-64, ...
```
This is good enough for us to know its a C or C++ compiled library. Next run the executable to read all strings.
```bash
$ strings ./authenticator/authenticator
...
Please enter your credentials to continue.
Alien ID: 
11337
Access Denied!
...
```
We can see that even without executing it we know what alias needs to be entered.
We execute the script and we find that only `11337` alias is accepted by script.
Then we use a decompiler that I found works flawlessly every single time. 
[retdec](github.com/avast/retdec) works awesome (would like to know if there are better out there than this). We can see following excerpt in the code that checks for PIN.
```c
    char v3 = *(char *)(v1 + (int64_t)"}a:Vh|}a:g}8j=}89gV<p<}:dV8<Vg9}V<9V<:j|{:"); // 0x98b
    int64_t result = 1; // 0x9a7
    while ((v3 ^ 9) == *(char *)(v1 + (int64_t)str)) {
        // 0x9b4
        v2++;
        v1 = v2;
        result = 0;
        if ((int64_t)strlen((char *)str) - 1 <= v1) {
            // break -> 0x9d4
            break;
        }
        v3 = *(char *)(v1 + (int64_t)"}a:Vh|}a:g}8j=}89gV<p<}:dV8<Vg9}V<9V<:j|{:");
        result = 1;
    }
```
It is basically a substitution cipher and the solution is `th3_auth3nt1c4t10n_5y5t3m_15_n0t_50_53cur3`.
