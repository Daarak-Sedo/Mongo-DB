         TOPIC: Mongoose Populate and Reference

For this assignment the session branch is session/populate-reference
For the solution you have to create a new branch in your own repo- assignment/populate-reference
Use your own Atlas database links to avoid issues. Use these collection names if you have already used the collections in previous assignments - newBook, newAuthor, newPublisher.

A newAuthor document should look like this (no author_id anymore - you can delete this from the schema)
 	{ 
_id: ObjectId("61951bfa4d9fe0d34da86829"),
		authorName:"Chetan Bhagat",
		age:50,
		address:"New Delhi",
rating: 2
	} 
A newPublisher document looks like this.
{
		_id: ObjectId("61951bfa4d9fe0d34da86344"),
name: “Penguin”,
headQuarter: “New Delhi”,
}
A newBook document should look like this. The author property is a reference to newAuthor collection. 
{
		_id: ObjectId("61951bfa4d9fe0d34da86344"),
	name:"Two states",
		author:"61951bfa4d9fe0d34da86829",
	price:50,
		ratings:4.5,
		publisher: "61951bfa4d9fe0d34da84523"
}


1. Write a POST api that creates an author from the details in request body

2. Write a POST api that creates a publisher from the details in the request body

3. Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body. 
In this api, you have to write a logic that validates the following :
The authorId is present in the request body. If absent send an error message that this detail is required
If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
The publisherId is present in the request body. If absent send an error message that this detail is required
If present, make sure the publisherId is a valid ObjectId in the publisher collection. If not then send an error message that the publisher is not present.

4. Write a GET api that fetches all the books along with their author details (you have to populate for this) as well the publisher details (you have to populate for this) 


Edit: New problem (5)
5. Create at least 4 publishers (Penguin, Bloomsbury, Saraswati House, HarperCollins). Create at least 6 authors with ratings 2, 3, 3.5, 4, 4.5 and 5. Create around 10 books with these publishers and authors.
Create a new PUT api /books and perform the following two operations
 a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.
 b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 



