import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(1000, 1000);
  };

  let brushSize = 20;
  let f;
  let spring = 0.4;
  let friction = 0.45;
  let x;
  let y;
  let oldX;
  let oldY;
  let oldR;
  let v = 0.5;
  let r = 0;
  let vx = 0;
  let vy = 0;
  let splitNum = 100;
  let diff = 10;

  p.draw = () => {
    if (p.mouseIsPressed) {
      if (!f) {
        f = true;
        x = p.mouseX;
        y = p.mouseY;
      }
      vx += (p.mouseX - x) * spring;
      vy += (p.mouseY - y) * spring;
      vx *= friction;
      vy *= friction;

      v += p.sqrt(vx * vx + vy * vy) - v;
      v *= 0.55;

      oldR = r;
      r = brushSize - v;
      var num = p.random(0.1, 0.8);
      var num2 = p.random(0.1, 0.8);
      for (let i = 0; i < splitNum; ++i) {
        oldX = x;
        oldY = y;
        x += vx / splitNum;
        y += vy / splitNum;
        oldR += (r - oldR) / splitNum;
        if (oldR < 1) {
          oldR = 1;
        }
        p.strokeWeight(oldR + diff);
        p.line(x + num, y + num, oldX + num, oldY + num);
        p.strokeWeight(oldR);
        p.line(
          x + diff * num2,
          y + diff * num2,
          oldX + diff * num2,
          oldY + diff * num2
        );
        p.line(
          x - diff * num,
          y - diff * num,
          oldX - diff * num,
          oldY - diff * num
        );
      }
    } else if (f) {
      vx = vy = 0;
      f = false;
    }
  };
};

new p5(sketch);
