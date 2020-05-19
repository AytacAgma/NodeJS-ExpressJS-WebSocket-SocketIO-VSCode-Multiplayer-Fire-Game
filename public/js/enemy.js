class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, id) {
        // super
        super(scene, x, y, "enemy");

        // render
        scene.add.existing(this);

        // physics rendering
        scene.physics.add.existing(this);

        this.depth = 5;
        this.id = id;
    }

    shoot() {
        new Shot(this.scene, this.x, this.y, this.angle);
    }

}