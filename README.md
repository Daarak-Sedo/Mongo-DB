

Assignment :
Create a books collection in your DB ( using bookModel with following fields)- bookName( mandatory field), price containing Indian and european price, year ( should be 2021 if no year is provided) , tags array, authorName, totalPages , stockAvailable ( true false) 


Price:{
	indianPrice: String,
	europeanPrice: String
},
Year: number 

create the following API’s (write logic in bookController and routes in routes):
createBook : to create a new entry..use this api to create 11+ entries in your collection
bookList : gives all the books- their bookName and authorName only 
find……). select( bookName: 1, authorName:1 , id: 0)
getBooksInYear: takes year as input in post request and gives list of all books published that year
.find( { year: {$eq: req.body.year })
getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
		bookMOdel.find ( { year : 2020 , bookName”: “intro to tech” } )
Let input = req.body // 
i will receive the exact condition in req.body
I have to pass this condition in find query
Req.bbody and condition in find both are jhson only
.find( req.body )
		
e.g if body had { name: “hi”} then you would fetch the books with this name
if body had { year: 2020} then you would fetch the books in this year
hence the condition will differ based on what you input in the request body
getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 
			. find( $or:  [ { price.indianPrice : “100inr”  }, { price.indianPrice : “200inr”  }, { price.indianPrice : “300inr”  } ]
			.find ( { price.IndianPrice : { $in : [ “100INR”, “200INR”, “300INR” ] } } )		
getRandomBooks - returns books that are available in stock or have more than 500 pages 
.find( $or : [ {available: true } , { pages: :{ $gt: 500} } } ] )

Find video explanation of the question here : https://drive.google.com/file/d/1D9UOEl5rbGGDPjVLDGsf1L4hg9BI1ZH7/view?usp=sharing 


