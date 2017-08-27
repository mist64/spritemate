

class Palette
{
  

  constructor(window,config,spritecolors)
  {
    this.spritecolors = spritecolors // contains the colors of the first sprite
    this.colors = config.colors;
    this.active_color = this.spritecolors[1]; // 1 = white on the c64
    this.window = window;
    this.canvas_element = document.createElement('canvas');
    this.colorsquare_width = 40;
    this.colorsquare_height = 20;
    this.width = this.colorsquare_width * 2;
    this.height = this.colors.length/2 * this.colorsquare_height + this.colorsquare_height+10;
    
    this.canvas_element.id = "palette";
    this.canvas_element.width = this.width;
    this.canvas_element.height = this.height;

    $("#window-"+this.window).append(this.canvas_element);

    this.canvas = this.canvas_element.getContext('2d');
 
    this.draw_colors();
    this.draw_active_color();

  }

  draw_colors()
  {
   
    let x = 0;
    let y = 0;

    for (let i=0; i<this.colors.length; i++)
    {
      this.canvas.fillStyle = this.colors[i];
      this.canvas.fillRect(x*this.colorsquare_width, y*this.colorsquare_height, this.colorsquare_width, this.colorsquare_height);
      
      x++;
      if (x == 2){
        x = 0;
        y ++;
      }
    } 
  }

  draw_active_color()
  {
    // draws the selected/active color
    // under the color palette
    
    this.canvas.fillStyle = this.colors[this.active_color];
    this.canvas.fillRect(0, (this.colors.length/2)*this.colorsquare_height + 10, this.colorsquare_width * 2, this.colorsquare_height);
     
  }

  set_active_color(e)
  {
    let pos = this.findPos(this.canvas_element);
    let x = e.pageX - pos.x , y = e.pageY - pos.y;
    let c = this.canvas;
    let p = c.getImageData(x, y, 1, 1).data; 
    let hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
    this.active_color = this.colors.indexOf(hex);
    this.draw_active_color();
  }

  get_color()
  {
    return this.active_color;
  }


  findPos(obj)
  {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
  }

  rgbToHex(r, g, b)
  {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

}
