import { Assets } from '../../gfx/assets';
import { Creature } from './creature';
import { Rectangle } from '../../gfx/shapes/rectangle';
// var lastAnimation = "walk_down";//, attackCounter = 0, lastAttackCounter = 0;

export class Player extends Creature {
  constructor(_handler, _x, _y){
    super(_handler, _x, _y);
    this.assets = Assets.getAssets('player');
    this.x = _x;
    this.y = _y;
    this.speed = 150;
    this.bounds.x = 0;
    this.bounds.y = 0;
    this.bounds.width = 16;
    this.bounds.height = 16;
    this.type = 'player';
    this.damage = 60;
    // this.portrait = Assets.getAssets('Portraits');
    // this.healthbar = new HealthBar(_handler, this, {
    // 						nodes: 100,
    // 						color: "red",
    // 						bgColor: "green",
    // 						fixed: true,
    // 						fixedX: 125,
    // 						fixedY: 558,
    // 						width: 104,
    // 						height: 12
    // });
    // 	color: "#0c0",			// var healthbar_properties = {

    // 	bgColor: "#a00",
    // 	yOffset: 10,
    // 	nodes: 100,
    // 	split: 0,
    // 	width: 75,
    // 	height: 6,
    // 	fadeTime: 0.98,
    // 	renderOnFull: "on",
    // 	border: {
    // 		show: false,
    // 		color: "#000",
    // 		width: 2
    // 	}
    // };
    // this.healthbar = new HealthBar(_handler, this, healthbar_properties);
  }

  tick(_dt) {
    // if (!this.handler.getWorld().getRoundOver()) {
      this.getInput(_dt);
      this.move();
      this.handler.getGameCamera().centerOnEntity(this);
      if (this.yMove < 0)
        this.assets.animations.walk_up.tick();
      if (this.yMove > 0)
        this.assets.animations.walk_down.tick();
      if (this.xMove > 0)
        this.assets.animations.walk_right.tick();
      if (this.xMove < 0)
        this.assets.animations.walk_left.tick();
      // this.assets.animations.idle.tick();
      if (this.health <= 0)
        this.assets.animations.death.tick();
    // }
  }

  render(_g) {
    //DRAW SWORD BEFORE PLAYER IF WALKING UP OR LEFT
    if (lastAnimation === 'walk_up'){
      this.weapon.bounds.x = -6;
      this.weapon.bounds.y = -32;
      this.weapon.bounds.width = 25;
      this.weapon.bounds.height = 50;
      _g.myDrawImage(this.weapon.walk_up, this.x - this.handler.getGameCamera().getxOffset() - 9, this.y - this.handler.getGameCamera().getyOffset() - 33, 32, 64);
    }
    if (lastAnimation === 'walk_left'){
      this.weapon.bounds.x = -37;
      this.weapon.bounds.y = 15;
      this.weapon.bounds.width = 50;
      this.weapon.bounds.height = 25;
      _g.myDrawImage(this.weapon.walk_left, this.x - this.handler.getGameCamera().getxOffset() - 40, this.y - this.handler.getGameCamera().getyOffset() + 11, 64, 32);
    }

    //Draw PLAYER
    _g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);

    //DRAW SWORD AFTER PLAYER IF WALKING DOWN OR RIGHT
    if (lastAnimation === 'walk_down'){
      this.weapon.bounds.x = -5;
      this.weapon.bounds.y = 35;
      this.weapon.bounds.width = 25;
      this.weapon.bounds.height = 50;
      _g.myDrawImage(this.weapon.walk_down, this.x - this.handler.getGameCamera().getxOffset() - 9, this.y - this.handler.getGameCamera().getyOffset() + 25, 32, 64);
    }
    if (lastAnimation === 'walk_right'){
      this.weapon.bounds.x = 19;
      this.weapon.bounds.y = 15;
      this.weapon.bounds.width = 50;
      this.weapon.bounds.height = 25;
      _g.myDrawImage(this.weapon.walk_right, this.x - this.handler.getGameCamera().getxOffset() + 7, this.y - this.handler.getGameCamera().getyOffset() + 11, 64, 32);
    }

    // if (this.attacking){
    // 	attackCounter++;
    // 	console.log("increment");
    // 	if (attackCounter >= 15){
    // 		console.log("resetting attack counter and lastAttackCounter");
    // 		attackCounter = 0;
    // 		lastAttackCounter = 0;
    // 		this.attacking = false;
    // 	}
    // }

    // lastAttackCounter++;

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // _g.fillStyle = "red";
    // _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!

    // ****** DRAW WEAPON BOUNDING BOX DON'T DELETE!!
    // _g.fillStyle = "green";
    // _g.fillRect(this.weapon.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.weapon.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.weapon.bounds.width, this.weapon.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  getInput(_dt) {
    this.xMove = 0;
    this.yMove = 0;
    // if((this.handler.getKeyManager().f || this.handler.getKeyManager().j) && lastAttackCounter > 30){
    // 	this.attacking = true;
    // }
    if(this.handler.getKeyManager().space){
      console.log("SPACE: JUMP!!");
    }
    if(this.handler.getKeyManager().up || this.handler.getKeyManager().upArrow) {
      this.yMove = -this.speed * _dt;
    }
    if (this.handler.getKeyManager().down || this.handler.getKeyManager().downArrow) {
      this.yMove = this.speed * _dt;
    }
    if(this.handler.getKeyManager().left || this.handler.getKeyManager().leftArrow) {
      this.xMove = -this.speed * _dt;
    }
    if (this.handler.getKeyManager().right || this.handler.getKeyManager().rightArrow) {
      this.xMove = this.speed * _dt;
    }
  }

  getCurrentAnimationFrame() {
    // if (this.health <= 0){
    // 	return this.assets.animations.death.getCurrentFrame();
    // }
    if (this.yMove < 0){
      lastAnimation = "walk_up";
      return this.assets.animations.walk_up.getCurrentFrame();
    } else if (this.yMove > 0){
      lastAnimation = "walk_down";
      return this.assets.animations.walk_down.getCurrentFrame();
    } else if (this.xMove < 0){
      lastAnimation = "walk_left";
      return this.assets.animations.walk_left.getCurrentFrame();
    } else if (this.xMove > 0){
      lastAnimation = "walk_right";
      return this.assets.animations.walk_right.getCurrentFrame();
    } else {
      return this.assets.animations[lastAnimation].getCurrentFrame();
    }
  }

  getHealthBar() {
    return this.healthbar;
  }

  getWeaponCollisionBounds(xOffset, yOffset) {
    return new Rectangle(this.weapon.bounds.x + this.x - this.handler.getGameCamera().getxOffset(),
      this.weapon.bounds.y + this.y - this.handler.getGameCamera().getyOffset(),
      this.weapon.bounds.width, this.weapon.bounds.height);
  }
}
