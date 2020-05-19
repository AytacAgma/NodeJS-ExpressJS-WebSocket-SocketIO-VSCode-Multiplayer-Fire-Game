class Shot extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, angle) {
        // super
        super(scene, x, y, "bullet");

        // render
        scene.add.existing(this);

        // physics rendering
        scene.physics.add.existing(this);

        // set angle
        this.setAngle(angle);

        this.setCollideWorldBounds(true);

        this.bullet_speed = 800;

        scene.bullets.add(this);

        // layer depth
        this.depth = 0;

        // DEG TO RAD
        angle = angle * (Math.PI / 180);

        this.vx = this.bullet_speed * Math.cos(angle);
        this.vy = this.bullet_speed * Math.sin(angle);
        
        this.setVelocity(this.vx, this.vy);

    }
}