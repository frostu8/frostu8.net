// load troll face
const trollImg = new Image();

trollImg.addEventListener("load", () => {
    let canvas = document.getElementById("troll-tuesday-canvas");
    let ctx = canvas.getContext("2d");

    (() => {
        // make sure that the canvas is always big enough
        function updateSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // make sure canvas always takes up 100% of the screen
        window.onresize = updateSize;

        // call once to keep updated
        updateSize();
    })();

    function randIn(min, max) {
        let diff = max - min;

        return Math.random() * diff + min;
    }

    class TrollProjectile {
        constructor(size, direction, pos) {
            this.size = size;
            this.direction = direction;
            this.pos = pos;
        }

        // draws the projectile.
        draw() {
            ctx.drawImage(trollImg, this.pos.x, this.pos.y, this.width(), this.height());
        }

        // resets our position to a random position above the canvas.
        rollPos() {
            this.pos = new Vector(randIn(-this.width(), canvas.width), -this.height());
        }

        // resets our position to a random point on the canvas.
        rollPosInitial() {
            this.pos = new Vector(
                randIn(-this.width(), canvas.width),
                randIn(-this.height(), canvas.height),
            );
        }

        // resets our speed to a random downward speed.
        rollDirection() {
            this.direction = Vector.down().mul(randIn(4, 16));
        }

        // resets our size to a random size.
        rollSize() {
            this.size = randIn(0.75, 1.25);
        }

        // resets all of our values to random values
        roll() {
            this.rollSize();
            this.rollDirection();
            this.rollPos();
        }

        // moves the projectile by the speed
        simulate() {
            this.pos = this.pos.add(this.direction);
        }

        // adds a delta to the speed to give the illusion that this projectile
        // is accelerating
        accelerate() {
            this.direction = this.direction.add(this.direction.mul(0.01));
        }

        // if the projectile is out of view and will stay out of view, reroll
        cull() {
            if (this.pos.y >= canvas.height)
                this.roll();
        }

        height() {
            return trollImg.height * this.size;
        }

        width() {
            return trollImg.width * this.size;
        }

        static initial() {
            let proj = new TrollProjectile(1, 0, 0);

            proj.rollSize();
            proj.rollDirection();
            proj.rollPosInitial();

            return proj;
        }

        static many(count) {
            let proj = [];

            for (let i = 0; i < count; i++)
                proj.push(TrollProjectile.initial());

            return proj;
        }
    }

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        add(other) {
            return new Vector(this.x + other.x, this.y + other.y);
        }

        mul(scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        }
        
        static zero() {
            return new Vector(0, 0);
        }

        static down() {
            return new Vector(0, 1);
        }
    }

    let sim = TrollProjectile.many(100);

    function simulate() {
        for (let proj of sim) {
            proj.simulate();
            proj.accelerate();
            proj.cull();
        }
    }

    function draw() {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let proj of sim) {
            proj.draw();
        }
    }

    window.setInterval(function() { simulate(); draw(); }, 1000 / 30);
});

// load troll face
trollImg.src = "/img/trollface.png";
