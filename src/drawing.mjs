import * as fs from 'fs';// drawing.js

export class GenericElement {
    constructor(name)
     {
         this.tag=name;
         this.attributes={};
         this.child=[];
         this.content="";
         
     }
     addAttr(name,value)
     {
         this.attributes[name]=value;
     }
     setAttr(name, value)
     {
         this.attributes[name]=value;
     }
    removeAttr(name)
     {
         delete this.attributes[name];
 
     }
     addAttrs(obj)
     {
         const arrr=Object.entries(obj);
         for(let i=0;i<arrr.length;i++)
         {
             this.addAttr(arrr[i][0],arrr[i][1]);
         }
        
     }
     removeAttrs(arr)
     {
         for(let i=0;i<arr.length;i++)
         {
             this.removeAttr(arr[i]);
         }
     }
     addChild(child)
     {
         this.child.push(child);
     }
     toString() 
    {
        
        // turn attributes into a string:
        // name=value
        const attrsString = Object.entries(this.attributes).reduce((s, attr) => {
            const [name, value] = attr;
            return `${s} ${name}="${value}"`;
        }, '');
        let nestedString= ">" + this.content;
        for(let i=0;i<this.child.length;i++)
        {
            
            nestedString= nestedString + '\n<' +this.child[i].tag +
            Object.entries(this.child[i].attributes).reduce((s,attr)=>
        {
            const[nam,val]=attr;
            return `${s} ${nam}="${val}"`;

        }, '') + ">" + this.child[i].content + "\n</" + this.child[i].tag + ">";
        }
        return `<${this.tag}${attrsString}${nestedString}\n</${this.tag}>`;
    }
     write(fileName, cb)
     {
         fs.writeFile(fileName,this.toString(),cb);
     }
 }

export class RootElement extends GenericElement {
    constructor()
     {
        super("svg");
        this.addAttr('xmlns', 'http://www.w3.org/2000/svg');
     }
}

export class RectangleElement extends GenericElement {
    constructor(x, y, width, height, fill)
    {
        super("rect");
        this.addAttr("x", x);
        this.addAttr("y", y);
        this.addAttr("width", width);
        this.addAttr("height", height);
        this.addAttr("fill", fill);
    }
}

export class TextElement extends GenericElement {
    constructor(x, y, fontSize, fill, content)
    {
        super("text");
        this.addAttr("x", x);
        this.addAttr("y", y);
        this.addAttr("fontsize", fontSize);
        this.addAttr("fill", fill);
        this.content= content;
    }
    
}

// the following is used for testing
// create root element with fixed width and height
const root = new RootElement();
root.addAttrs({width: 800, height: 170, abc: 200, def: 400});
root.removeAttrs(['abc','def', 'non-existent-attribute']);

// create circle, manually adding attributes, then add to root element
const c = new GenericElement('circle');
c.addAttr('r', 75);
c.addAttr('fill', 'yellow');
c.addAttrs({'cx': 200, 'cy': 80});
root.addChild(c);

// create rectangle, add to root svg element
const r = new RectangleElement(0, 0, 200, 100, 'blue');
root.addChild(r);

// create text, add to root svg element
const t = new TextElement(50, 70, 70, 'red', 'wat is a prototype? 😬');
root.addChild(t);

// show string version, starting at root element
console.log(root.toString());

// write string version to file, starting at root element
