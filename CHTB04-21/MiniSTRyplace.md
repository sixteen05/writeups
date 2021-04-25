
# MiniSTRyplace

This challenge contained a local file inclusion vulnerability.

In the `challenge/index.php` file, where we use the query parameter `lang` to include the file. We can see the `str_replace` function is used to replace `../` with blank, meaning the attempt of getting the flag file with `../../../flag` won't work.
We can instead use `..././` which becomes `../` hence allowing valid path traversal to get the flag.

GET call to get the flag -

```
GET /?lang=..././..././..././flag HTTP/1.1
```
