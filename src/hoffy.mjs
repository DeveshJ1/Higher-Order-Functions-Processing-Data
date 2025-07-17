// hoffy.mjs
import { readFileSync } from 'node:fs';
export function getEvenParam(...args)
{
    
    if(args.length===0)
    {
        return [];
    }  
    const x=args.filter((element,index)=>
        {
            return index%2 === 0;
        });
    return x;
}
export function maybe(fn)
{
return function(...arg)    
    {
        if (arg.includes(undefined) || arg.includes(null))
        {
            return undefined;
        }
        return fn(...arg);
    };
}
export function filterWith(fn)
{
    return function(arr)
    {
      const filtered= arr.filter((element)=>{
          return fn(element);
      });
      return filtered;
      
    };
}
export function repeatCall(fn, n, arg)
{
    if (n<=0)
    {
        return;
    }
    else
    {
        fn(arg);
        repeatCall(fn, n-1, arg);
    }
}
export function largerFn(fn, gn)
{
    return function(args)
    {
        const x= fn(args);
        const y=gn(args);
        if(x>=y)
        {
            return fn;
        }
        return gn;
    };
}
export function limitCallsDecorator(fn, n)
{
    return function(args)
    {
        if(n>0)
        {
            n--;
            return fn(args);
        }
    };
}
export function myReadFile(fileName, successFn, errorFN)
{
    try {
        const data = readFileSync(fileName,'utf-8');
        successFn(data);
      } 
      catch (err) 
      {
          errorFN(err);
      }
}
export function rowsToObjects(data)
{
    return data.rows.reduce((acc, e) =>{
        acc.push(data.headers.reduce((r, h, i)=> {r[h] = e[i]; return r; }, {}));
        return acc;
     }, []);
}

