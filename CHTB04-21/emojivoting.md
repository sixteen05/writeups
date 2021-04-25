
# emoji voting
###### Category: Web

Checking the source code we can see that `/api/list` takes and argument  `order` and uses this argument into SQL query without SQL Parameters. We can see in `database.js` that flag table is created with a random number appended to it, which means we also need to figure out the table name. As we are using `sqllite` the table names are stored in `sqlite_master` table. We pass a `case` command to order by one column when condition matches and order my another column when it doesn't. We confirm one character at a time in flag table name by matching the substring of table name. Find the complete [code here](./neversawthatcoming.js).
```js
            // refomatted for understanding purposes
            "body": "{\"order\":\"( 
			  CASE SUBSTR(
			    (   
				    SELECT name FROM sqlite_master 
				    WHERE name LIKE 'flag_%'),1," + _length + "
			    ) 
			    WHEN '" + flag_prefix + flag_char + "' 
			    THEN name ELSE count END
			  ) 
			ASC\"}",
```

Above script is inside a `for` loop which iterates over all possibilities of `flag_...` name and recursively proceeds with names that match the table name.
Once we get the file name we just need the content of flag in first row.
Minor modifications to above query to read the flag ([complete code](./thisIsawcoming.js)) and this challenge is PWN'd as well.

