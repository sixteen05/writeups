
# PhaseStream 1

XOR using a repeated 5 byte key. We know the flag starts with `CHTB{` so using Python we can XOR that with the first 5 bytes of ciphertext. 

This gives us the key(made equal to ciphertext length since we know the key is repeated 5 byte key), now we can use that to decode the ciphertext to get the flag.
