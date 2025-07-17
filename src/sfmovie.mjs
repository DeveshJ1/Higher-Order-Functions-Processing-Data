// sfmovie.js
export function longestFunFact(data)
{
    let temp={};
    let biglength=0;
    for(let i=0;i<data.length;i++)
    {
        if(data[i]['Fun Facts'].length > biglength)
        {
            biglength=data[i]['Fun Facts'].length;
            temp=data[i];
        }
    }
    return temp;
}
export function getMovies2021(data)
{
    const temp= new Array();
    for(let i=0;i<data.length;i++)
    {
        if(temp.length===0)
        {
            if(data[i]['Release Year'] === '2021')
            {
                temp.push(data[i].Title);
            }
        }
        else
        {
            let m= 0;
            if(data[i]['Release Year'] === '2021' )
            {
                let flag=true;
                while(m<temp.length)
                {
                    if(data[i].Title === temp[m])
                    {
                        
                        flag =false;
                        break;
                    }
                    m++;
                }
                if(flag===true)
                {
                    temp.push(data[i].Title);
                }
             }
        }
    }
    return temp;
}
export function getProductionCompany(data)
{
    const temp= new Array();
    for(let i=0;i<data.length;i++)
    {
        if(temp.length===0)
        {
           temp.push(data[i]['Production Company']);
        }
        else
        {
            let m= 0;
            let flag=true;
            while(m<temp.length)
            {
                if(data[i]["Production Company"] === temp[m])
                {
                        
                    flag =false;
                    break;
                }
                m++;
            }
            if(flag===true)
            {
                temp.push(data[i]['Production Company']);
            }
        }
    }
    return temp;
}
export function compareFn(a, b) {
    return b[1]-a[1];
  }
export function mostPopularActors(data)
{
    const temp= new Array();
    for(let i=0;i<data.length;i++)
    {
        let count=0;
        if(data[i]["Actor 1"] === ""){continue;}
        const joint= [].concat.apply([],temp);
        const index=joint.indexOf(data[i]["Actor 1"]);
        if(index>0)
        {
            continue;
        }
        temp[i]= new Array();
        temp[i].push(data[i]["Actor 1"]);
        let m=i;
        while(m<data.length)
        {
            if(temp[i][0]===data[m]["Actor 1"])
            {
                m++;
                count++;
            }else
            {
                m++;
                continue; 
            }
        }
        temp[i].push(count);
    }
    const secondtemp= new Array();
    for(let i=0;i<data.length;i++)
    {
        let count=0;
        if(data[i]["Actor 2"] === ""){continue;}
        const joint= [].concat.apply([],secondtemp);
        const index=joint.indexOf(data[i]["Actor 2"]);
        if(index>0)
        {
            continue;
        }
        secondtemp[i]= new Array();
        secondtemp[i].push(data[i]["Actor 2"]);
        let m=i;
        while(m<data.length)
        {
            if(secondtemp[i][0]===data[m]["Actor 2"])
            {
                m++;
                count++;
            }else
            {
                m++;
                continue; 
            }
        }
        secondtemp[i].push(count);
    }
    const thirdtemp= new Array();
    for(let i=0;i<data.length;i++)
    {
       let count=0;
        if(data[i]["Actor 3"] === ""){continue;}
        const joint= [].concat.apply([],thirdtemp);
        const index=joint.indexOf(data[i]["Actor 3"]);
        if(index>0)
        {
            continue;
        }
        thirdtemp[i]= new Array();
        thirdtemp[i].push(data[i]["Actor 3"]);
        let m=i;
        while(m<data.length)
        {
            if(thirdtemp[i][0]===data[m]["Actor 3"])
            {
                m++;
                count++;
            }else
            {
                m++;
                continue; 
            }
        }
        thirdtemp[i].push(count);
    }
    temp.sort(compareFn);
    secondtemp.sort(compareFn);
    thirdtemp.sort(compareFn);
    const actorsarr= new Array();
    actorsarr.push(temp[0]);
    actorsarr.push(temp[1]);
    actorsarr.push(thirdtemp[0]);


    return actorsarr;
}