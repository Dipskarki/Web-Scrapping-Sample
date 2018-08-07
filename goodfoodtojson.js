let axios = require('axios');
let cheerio = require('cheerio'); 
let fs = require('fs'); 

axios.get('https://www.bbcgoodfood.com/recipes/collection/chicken-salad')
	.then((response) => {
		if(response.status === 200) {
		      const html = response.data;
		      const $ = cheerio.load(html); 
		      var goodfoodtojson = [];
			
		      $('.view-content').each(function(i, elem) {
				goodfoodtojson[i] = {
					food: $(this).find('h3').text().trim()
				};
				

		      });
			
		      let goodfoodListTrimmed = goodfoodtojson.filter(n => n != undefined ) 
		      fs.writeFile('goodfoodList.json', 
			JSON.stringify(goodfoodListTrimmed, null, 4), (err)=>{
			console.log('File successfully written!');
		      })
		}
	}, (error) => console.log(error));