
# PhaseStream 2

This challenge is very similar to `PhaseStream 1`. The key is only 1 byte and we are given a file that has many encrypted strings from which one of them contains our flag.

We follow the same approach as in the above challenge to get the key. Then we read one encrypted string at a time and decode it using the key we found. Since we know the flag should contain `CHTB{` we use that to filter our decoded strings to get the flag value.
