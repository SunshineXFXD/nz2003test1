class SetZoom {
    constructor(element, imageArr) {
        this.ele = element;
        // this.imgArr = imageArr;

       
        this.show = element.querySelector('.show');

        //this.mask = element.querySelector('.mask');
        this.mask = element.querySelector('.mask');

        this.glass = element.querySelector('.glass');
        this.glassimg = element.querySelector('.glass>img')

        // this.list = element.querySelector('.list');

        // this.li = element.querySelectorAll('ul>li');

        // this.img = element.querySelector('img');


        this.boxLeft = this.ele.offsetLeft;
        this.boxTop = this.ele.offsetTop;


        this.showBorderLeft = this.show.clientLeft;
        this.showBorderTop = this.show.clientTop;

        this.showWidth = this.show.clientWidth;
        this.showHeight = this.show.clientHeight;


        this.maskWidth = parseInt(myGetStyle(this.mask, 'width'));
        this.maskHeight = parseInt(myGetStyle(this.mask, 'height'));

        this.glassWidth = parseInt(myGetStyle(this.glass, 'width'));
        this.glassHeight = parseInt(myGetStyle(this.glass, 'height'));

        this.BGIWidth = parseInt(myGetStyle(this.glassimg, 'width'));
        this.BGIHeight = parseInt(myGetStyle(this.glassimg, 'height'));

    }


    init() {
        this.inOut();
        this.move();
    };


    inOut() {
        this.show.addEventListener('mouseenter', () => {

            this.show.style.border = "1px solid red";

            this.mask.style.display = 'block';

            this.glass.style.display = 'block';
            this.glass.style.border = '1px solid red';
        })
        this.show.addEventListener('mouseleave', () => {
            this.show.style.border = "0"
            this.glass.style.border = "0"
            this.mask.style.display = 'none';
            this.glass.style.display = 'none';
            
        })

    }



    move() {
        this.show.addEventListener('mousemove', (e) => {


            let x = e.clientX - this.boxLeft - this.showBorderLeft - this.maskWidth / 2;
            let y = e.clientY - this.boxTop - this.showBorderTop - this.maskHeight / 2;


            if (x < 0) {
                x = 0;
            }

            if (y < 0) {
                y = 0;
            }

            if (x > this.showWidth - this.maskWidth) {
                x = this.showWidth - this.maskWidth;
            }

            if (y > this.showHeight - this.maskHeight) {
                y = this.showHeight - this.maskHeight;
            }

            this.mask.style.top = y + 'px';
            this.mask.style.left = x + 'px';



            let bx = this.BGIWidth * x / this.showWidth;
            let by = this.BGIHeight * y / this.showHeight;
            // let bx = this.BGIWidth * x / this.showWidth;
            // let by = this.BGIWidth * y / this.showHeight;



            // this.glass.style.backgroundPosition = `-${bx}px -${by}px`;
            this.glassimg.style.left = `-${bx}px`;
            this.glassimg.style.top = `-${by}px`;
        })

    }


}


// 获取css样式函数
function myGetStyle(element, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[attr];
    } else {
        return element.currentStyle[attr];
    }
}