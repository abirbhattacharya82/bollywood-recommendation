const express=require('express');
const app=express();
const port=process.env.PORT || 8000;

app.get('/',(req,res)=>{
    const year=""+req.query.year;
    const genre=""+req.query.genre;

    const csv = require('csv-parser')
    const fs = require('fs')
    const results = [];

    fs.createReadStream('Movie_List.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const final_list=[];
            for(let i=0;i<results.length;i++){
                if(genre=="undefined" && year=="undefined")
                {
                    res.send({
                        "error":"Invalid Query"
                    });
                }
                else if(genre=="undefined" && year!="undefined")
                {
                    if(results[i]['Year']==year)
                    {
                        final_list.push(results[i]);
                    }
                }
                else if(year=="undefined" && genre!="undefined")
                {
                    if(results[i]['Genre']==genre)
                    {
                        final_list.push(results[i]);
                    }
                }
                else if(genre!="undefined" && year!="undefined")
                {
                    if(results[i]['Year']==year && results[i]['Genre']==genre)
                    {
                        final_list.push(results[i]);
                    }
                }
            }
            res.send({
                "data":final_list
            });
        });
});

app.listen(port);