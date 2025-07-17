// report.js
import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as drawing from '../src/drawing.mjs';
import * as sfmovie from '../src/sfmovie.mjs';
let filepath;


if(process.argv.length===3)
{
    console.log("hello!");
    filepath=process.argv[2];
}
else
{
    console.log("hello");
    filepath="src/data/Film_Locations_in_San_Francisco.csv";
}
fs.readFile(filepath,'utf-8',(err,data)=>{
    //parse the data
    if(err)
    {
        console.log(err);
    }
    else
    {
    parse(data,{
            columns:true
        }, function(err,records){
            if(err)
            {
                console.log(err);
            }
            data=records;
            console.log(sfmovie.longestFunFact(data));
            console.log(sfmovie.getMovies2021(data));
            for (let i=0;i<3;i++)
            {
                console.log(sfmovie.getProductionCompany(data)[i]);
            }
            const root = new drawing.RootElement();
            root.addAttrs({width:800,height:400});
            const actors= sfmovie.mostPopularActors(data);
            const actor1=actors[2];
            const actor2=actors[0];
            const actor3=actors[1];
            const firstActor = new drawing.RectangleElement(0, 100, 200, actor1[1], 'blue');
            const secondActor = new drawing.RectangleElement(250, 100, 200, actor2[1], 'yellow');
            const thirdActor = new drawing.RectangleElement(500, 100, 200, actor3[1], 'black');
           const firsttext= new drawing.TextElement(0, 260, 70, 'black',actor1[0] +" "+ actor1[1] );
           const secondtext= new drawing.TextElement(250, 260, 70, 'black',actor2[0] +" "+ actor2[1] );
           const thirdtext= new drawing.TextElement(500, 260, 70, 'black', actor3[0] +" "+ actor3[1]);
           root.addChild(firstActor);
           root.addChild(secondActor);
           root.addChild(thirdActor);
           root.addChild(firsttext);
           root.addChild(secondtext);
           root.addChild(thirdtext);
           //console.log(root.toString());
           root.write('test.svg', () => console.log('done writing!'));










        });

    }

});
